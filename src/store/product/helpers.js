import * as c from './constants';
import Firebase from 'firebase';
import 'firebase/firestore';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Globals

/**
 * Find the product given its id from the product list
 * @param {Object} state The local product state
 * @param {string} productId
 * @returns {Product}
 */
export function findProductById(state, productId) {
  return /** @type {Product} */ (state[c.PRODUCT_KEY_LIST] || []).find((product) => product.id === productId) || null;
}

/**
 * Find the product unit given its index from the product list
 * @param {Object} state The local product state
 * @param {string} productId
 * @param {number} productUnitIndex
 * @returns {{ product: Product, productUnit: ProductUnit }}
 */
export function findProductUnitByIndex(state, productId, productUnitIndex) {
  /** @type {Product} */
  let product = findProductById(state, productId);
  /** @type {ProductUnit} */
  let productUnit = product ? (product.units || [])[productUnitIndex] : null;
  return {
    product,
    productUnit,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Firebase

/**
 * Return a Product instance from the Firestore document
 * @param {firebase.firestore.QueryDocumentSnapshot<T>} document
 * @returns {Product}
 */
export function createProductFromDocumentData(document) {
  return /** @type {Product} */({
    [c.PRODUCT_FIRESTORE_ID]: document.id,
    ...document.data(),
  });
}

/**
 * Commit and save a modified product unit
 * @param {Object} state The local product state
 * @param {function} commitDo
 * @param {function} commitUndo
 * @param {string} productId
 * @param {number} productUnitIndex
 * @returns {Promise<void>}
 */
export function commitAndSaveProductUnit({ commitDo, commitUndo, productId, productUnitIndex, state }) {
  let { product, productUnit } = findProductUnitByIndex(state, productId, productUnitIndex);
  if (product && productUnit) {
    commitDo();
    return saveProduct(product)
      .catch(commitUndo);
  } else {
    return Promise.reject();
  }
}

/**
 * Return the Firestore product collection
 * @param {Object?} options
 * @param {string} options.orderBy
 * @returns {firebase.firestore.CollectionReference<firebase.firestore.DocumentData>}
 */
export function getProductCollection(options) {
  let collection = Firebase.firestore()
    .collection(c.PRODUCT_FIRESTORE_COLLECTION);
  if (options) {
    if (options.orderBy) {
      collection = collection.orderBy(options.orderBy);
    }
  }
  return collection;
}

/**
 * Save the given product to the Firestore server
 * @param {Product} product
 * @returns {Promise<void>}
 */
export function saveProduct(product) {
  return getProductCollection()
    .doc(product[c.PRODUCT_FIRESTORE_ID])
    .set(product, { merge: true });
}

/**
 * Validate the given product
 * @param {Object} state The local product state
 * @param {{ product: Product, file: File }} payload
 * @param {string} mode
 * @returns {Array<{ error: string, unitIndex?: number }>}
 */
export function validateProduct(state, payload, mode) {
  let errors = [];
  let foundProduct = findProductById(state, payload.product.id);

  if (!payload.product.id) {
    errors.push({ error: c.PRODUCT_ERROR_MISSING_ID });
  }
  if (mode === 'create' && state[c.PRODUCT_KEY_LIST].find(p => p.id === payload.product.id)) {
    errors.push({ error: c.PRODUCT_ERROR_ID_EXISTS });
  }
  if (mode === 'update' && !foundProduct) {
    errors.push({ error: c.PRODUCT_ERROR_ID_UNKNOWN });
  }
  if (!/^[a-z0-9_-]+$/.test(payload.product.id)) {
    errors.push({ error: c.PRODUCT_ERROR_ID_MALFORMED });
  }
  if (!payload.product.name) {
    errors.push({ error: c.PRODUCT_ERROR_MISSING_NAME });
  }
  if (!payload.product.type) {
    errors.push({ error: c.PRODUCT_ERROR_MISSING_TYPE });
  }
  if (Object.values(c.PRODUCT_TYPES).indexOf(payload.product.type) < 0) {
    errors.push({ error: c.PRODUCT_ERROR_TYPE_UNKNOWN });
  }
  if (!payload.product.units.length) {
    errors.push({ error: c.PRODUCT_ERROR_MISSING_UNITS });
  }
  for (let unitIndex = 0, l = payload.product.units.length; unitIndex < l; unitIndex++) {
    let unit = payload.product.units[unitIndex];
    if (Object.values(c.PRODUCT_CONTROLS).indexOf(unit.control) < 0) {
      errors.push({ error: c.PRODUCT_ERROR_TYPE_UNKNOWN, unitIndex });
    }
    if (!unit.one) {
      errors.push({ error: c.PRODUCT_ERROR_MISSING_UNIT_ONE, unitIndex });
    }
    if (!unit.many) {
      errors.push({ error: c.PRODUCT_ERROR_MISSING_UNIT_MANY, unitIndex });
    }
    if (!unit.increment) {
      errors.push({ error: c.PRODUCT_ERROR_MISSING_UNIT_INCREMENT, unitIndex });
    }
    if (typeof unit.increment !== 'number') {
      errors.push({ error: c.PRODUCT_ERROR_MISSING_UNIT_INCREMENT_MALFORMED, unitIndex });
    }
    if (typeof unit.alert !== 'number') {
      errors.push({ error: c.PRODUCT_ERROR_MISSING_UNIT_ALERT_MALFORMED, unitIndex });
    }
    if (typeof unit.quantity !== 'number') {
      errors.push({ error: c.PRODUCT_ERROR_MISSING_UNIT_QUANTITY_MALFORMED, unitIndex });
    }
    if (!payload.file && mode === 'create') {
      errors.push({ error: c.PRODUCT_ERROR_MISSING_FILE });
    }
    if (payload.file && !(payload.file instanceof File)) {
      errors.push({ error: c.PRODUCT_ERROR_FILE_MALFORMED });
    }
    if (payload.file && !/^image\/jpe?g$/i.test(payload.file.type)) {
      errors.push({ error: c.PRODUCT_ERROR_FILE_NOT_SUPPORTED });
    }
  }

  return errors;
}
