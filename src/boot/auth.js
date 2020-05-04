import * as authConstants from 'src/store/auth/constants';
import * as productConstants from 'src/store/product/constants';
import Firebase from 'firebase/app';
import Vue from 'vue';
import 'firebase/auth';
import 'firebase/storage';

/**
 * Try to silently get the user's email from the Firebase auth mechanism
 * Commit to the store if one is given
 * @returns {Promise<void>}
 */
export default ({ store }) => {
  return new Promise((resolve) => {
    Firebase.auth()
      .onAuthStateChanged(
        (user) => {
          if (user && !store.state[authConstants.AUTH_GET_IS_AUTHENTICATED]) {
            let storage = Firebase.storage().ref(user.email);
            Vue.prototype.$storageImg = (id) => storage.child(id + '.jpg').getDownloadURL();
            store.$storageRef = Vue.prototype.$storageRef = storage;
            productConstants.PRODUCT_FIRESTORE_COLLECTION.value = user.email;
            store.commit(authConstants.AUTH_SET_EMAIL, user.email);
          }
          resolve();
        },
        resolve,
        resolve,
      );
  });
}
