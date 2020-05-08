import Firebase from 'firebase/app';
import firebaseConf from '../../firebase.conf';
import 'firebase/firestore';

export const FIRESTORE_COLLECTION_PRODUCTS = 'products';
export const FIRESTORE_COLLECTION_SETTINGS = 'settings';
export const FIRESTORE_COLLECTION_SHOPPING = 'shopping';

let fireStoreNamespace = '';

/**
 * Set the firestore namespace in order to get proper collection names
 * @param {string} namespace The firestore namespace
 */
export function setFireStoreNamespace(namespace) {
  fireStoreNamespace = namespace;
}

/**
 * Get a namespaced collection name
 * @throws {Error}
 * @param key
 */
export function getFireStoreCollection(key) {
  if (!fireStoreNamespace) {
    throw new Error('The firestore namespace must be set first');
  }
  if (
    key === FIRESTORE_COLLECTION_PRODUCTS ||
    key === FIRESTORE_COLLECTION_SETTINGS ||
    key === FIRESTORE_COLLECTION_SHOPPING
  ) {
    return fireStoreNamespace + '-' + key;
  } else {
    throw new Error('The given firestore collection key is unknown');
  }
}

export default ({ Vue }) => {
  Firebase.initializeApp(firebaseConf);
  Vue.prototype.$firebase = Firebase;
}
