import * as authConstants from 'src/store/auth/constants';
import Firebase from 'firebase/app';
import 'firebase/auth';

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
          if (user && !store.state[authConstants.AUTH_GETTER_IS_AUTHENTICATED]) {
            store.commit(authConstants.AUTH_MUTATION_EMAIL, user.email);
          }
          resolve();
        },
        resolve,
        resolve,
      );
  });
}
