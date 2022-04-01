
// import * as  firebase from "firebase";

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDVbJaOGGgpw5jdNqf5cZwaoywCQY7EAas",
  authDomain: "hooperhubdb.firebaseapp.com",
  projectId: "hooperhubdb",
  storageBucket: "hooperhubdb.appspot.com",
  messagingSenderId: "713535483524",
  appId: "1:713535483524:web:fb120244e84e99b0f41cd1"
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }

// const auth = firebase.auth()

// export { auth };

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);