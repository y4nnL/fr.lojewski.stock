import Firebase from 'firebase/app';
import 'firebase/firestore';
import conf from '../../firebase.conf';

export const FIRESTORE_COLLECTION_PRODUCTS = 'products';

export default ({ Vue }) => {
  Firebase.initializeApp(conf);
  Vue.prototype.$firebase = Firebase;
}
