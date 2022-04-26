
// import * as  firebase from "firebase";

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyDVbJaOGGgpw5jdNqf5cZwaoywCQY7EAas",
//   authDomain: "hooperhubdb.firebaseapp.com",
//   projectId: "hooperhubdb",
//   storageBucket: "hooperhubdb.appspot.com",
//   messagingSenderId: "713535483524",
//   appId: "1:713535483524:web:fb120244e84e99b0f41cd1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAkE4Z4gY3KW-6W_BRALh8pmaZKa82YgR0",
  authDomain: "hoopershub-ebb35.firebaseapp.com",
  projectId: "hoopershub-ebb35",
  storageBucket: "hoopershub-ebb35.appspot.com",
  messagingSenderId: "241994798566",
  appId: "1:241994798566:web:000edac3d06b79c4753227"
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