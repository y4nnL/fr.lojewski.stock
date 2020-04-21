import Firebase from 'firebase';
import 'firebase/firestore';
import { FIRESTORE_COLLECTION_PRODUCTS } from 'boot/firebase';

export function productCollection() {
  return Firebase.firestore()
    .collection(FIRESTORE_COLLECTION_PRODUCTS);
}

export function findProductUnitByIndex(productState, productId, unitIndex) {
  let product = productState.list.find((product) => product.id === productId);
  let productUnit = product ? product.units[unitIndex] : null;
  return { product, productUnit };
}

export function saveProduct(product) {
  return productCollection()
    .doc(product.firestoreId)
    .set(product, { merge: true });
}

export function commitSaveProductUnit({ doCommit, undoCommit, state, productId, unitIndex }) {
  let { product, productUnit } = findProductUnitByIndex(state, productId, unitIndex);
  if (product && productUnit) {
    doCommit();
    return saveProduct(product)
      .catch(() => undoCommit());
  } else {
    return Promise.reject();
  }
}
