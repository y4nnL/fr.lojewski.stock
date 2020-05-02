import * as c from './constants';
import Firebase from 'firebase';
import 'firebase/firestore';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Globals

/**
 * Find the product unit given its index from the product list
 * @param {Object} state The local product state
 * @param {string} productId
 * @param {number} productUnitIndex
 * @returns {{ product: Product, productUnit: ProductUnit }}
 */
export function findProductUnitByIndex(state, productId, productUnitIndex) {
  /** @type {Product} */
  let product = state[c.PRODUCT_KEY_LIST].find((product) => product.id === productId);
  /** @type {ProductUnit} */
  let productUnit = product ? product.units[productUnitIndex] : null;
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
