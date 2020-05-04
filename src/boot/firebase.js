import Firebase from 'firebase/app';
import firebaseConf from '../../firebase.conf';
import 'firebase/firestore';

export default ({ Vue }) => {
  Firebase.initializeApp(firebaseConf);
  Vue.prototype.$firebase = Firebase;
}
