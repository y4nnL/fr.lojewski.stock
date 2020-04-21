import Firebase from 'firebase';
import 'firebase/auth';

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER
} from './constants';
import { ROUTE_NAME_AUTH } from 'src/router/constants';

export default {
  [AUTH_LOGIN]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Firebase.auth()
        .signInWithEmailAndPassword(payload.username, payload.password)
        .then(({ user }) => {
          commit(AUTH_USER, { name: user.email });
          resolve();
        })
        .catch(reject);
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      Firebase.auth()
        .signOut()
        .then(() => {
          commit(AUTH_USER, { name: '' });
          resolve();
        }).catch(reject);
    });
  }
};
