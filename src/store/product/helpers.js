import * as c from './constants';
import * as firebaseBoot from 'boot/firebase';
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
 * @param {string} productUnitId
 * @returns {{ product: Product, productUnit: ProductUnit }}
 */
export function findProductUnitById(state, productId, productUnitId) {
  /** @type {Product} */
  let product = findProductById(state, productId);
  /** @type {ProductUnit} */
  let productUnit = product ? (product.units || []).find(u => u.id === productUnitId) : null;
  return { product, productUnit };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Firebase

/**
 * Return a Product instance from the Firestore document
 * @param {firebase.firestore.QueryDocumentSnapshot<T>} document
 * @returns {Product}
 */
export function createProductFromDocumentData(document) {
  return /** @type {Product} */(document.data());
}

/**
 * Commit and save a modified product unit
 * @param {Object} state The local product state
 * @param {function} commitDo
 * @param {function} commitUndo
 * @param {string} productId
 * @param {string} productUnitId
 * @returns {Promise<void>}
 */
export function commitAndSaveProductUnit({ commitDo, commitUndo, productId, productUnitId, state }) {
  let { product, productUnit } = findProductUnitById(state, productId, productUnitId);
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
 * @param {Array} options.where
 * @returns {firebase.firestore.CollectionReference<firebase.firestore.DocumentData>}
 */
export function getProductCollection(options) {
  let collection = Firebase.firestore()
    .collection(firebaseBoot.getFireStoreCollection(firebaseBoot.FIRESTORE_COLLECTION_PRODUCTS));
  if (options) {
    if (options.where) {
      collection = collection.where(...options.where);
    }
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
  return getProductCollection({ where: [ 'id', '==', product.id ] })
    .get()
    .then(querySnapshot => {
      return getProductCollection()
        .doc(querySnapshot.docs[0].id)
        .set(product, { merge: true });
    });
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
  if (mode === 'create' && foundProduct) {
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
    if (payload.product.units.find(u => u.id === unit.id) !== unit) {
      errors.push({ error: c.PRODUCT_ERROR_DUPLICATE_UNIT_ID, unitIndex });
    }
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
