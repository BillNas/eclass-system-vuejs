import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBgCiU4K5RWNGTsICKlDvdqK0h5NJKiCYU",
  authDomain: "eclass-system-b1641.firebaseapp.com",
  databaseURL: "https://eclass-system-b1641.firebaseio.com",
  projectId: "eclass-system-b1641",
  storageBucket: "eclass-system-b1641.appspot.com",
  messagingSenderId: "410644904442",
  appId: "1:410644904442:web:40b6f40c82fa8dacd4cc43",
  measurementId: "G-GJCMQ2CDMN"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig).firestore();
} else {
  firebase.app().firestore();
}

export default firebase;
