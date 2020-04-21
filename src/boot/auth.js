import Firebase from 'firebase/app';
import 'firebase/auth';

import { AUTH_MUTATION_USER } from 'src/store/auth/constants';

export default ({ store }) => {
  return new Promise((resolve) => {
    Firebase.auth()
      .onAuthStateChanged(
        (user) => {
          if (user) {
            store.commit(AUTH_MUTATION_USER, { name: user.email });
          }
          resolve();
        },
        resolve,
        resolve
      );
  });
}
