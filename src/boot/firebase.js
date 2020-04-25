import Firebase from 'firebase/app';
import firebaseConf from '../../firebase.conf';
import 'firebase/firestore';

export const FIRESTORE_COLLECTION_PRODUCTS = 'products';

export default ({ Vue }) => {
  Firebase.initializeApp(firebaseConf);
  Vue.prototype.$firebase = Firebase;
}
