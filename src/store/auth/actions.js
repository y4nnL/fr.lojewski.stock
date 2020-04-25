import * as constants from './constants';
import Firebase from 'firebase';
import 'firebase/auth';

export default {
  /**
   * Attempt to log in to the Firebase database
   * @param {string} username The user's name
   * @param {string} password The user's password
   * @returns {Promise<string>}
   */
  [constants.AUTH_KEY_LOGIN]: ({ commit }, { username, password }) => {
    return new Promise((resolve, reject) => {
      Firebase.auth()
        .signInWithEmailAndPassword(username, password)
        .then(({ user }) => {
          commit(constants.AUTH_KEY_EMAIL, user.email);
          resolve(user.email);
        })
        .catch(reject);
    });
  },
  /**
   * Attempt to log out of the Firebase database
   * @returns {Promise<void>}
   */
  [constants.AUTH_KEY_LOGOUT]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      Firebase.auth()
        .signOut()
        .then(() => {
          commit(constants.AUTH_KEY_EMAIL, '');
          resolve();
        }).catch(reject);
    });
  },
};
