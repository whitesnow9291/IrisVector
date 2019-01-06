import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyA-iAN6EuoOSM-bzFBw0c5cC5mnVd9nvXk",
  authDomain: "trading-ui.firebaseapp.com",
  databaseURL: "https://trading-ui.firebaseio.com",
  projectId: "trading-ui",
  storageBucket: "trading-ui.appspot.com",
  messagingSenderId: "195312450657"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const settings = { timestampsInSnapshots: true };
const auth = firebase.auth();
const db = firebase.firestore();
db.settings(settings);

export { auth, db };
