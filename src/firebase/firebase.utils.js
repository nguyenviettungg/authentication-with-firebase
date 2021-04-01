import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAfQOswwvmnrM5yorZCF0oZyoe4Hta1w4o",
  authDomain: "crown-thing.firebaseapp.com",
  projectId: "crown-thing",
  storageBucket: "crown-thing.appspot.com",
  messagingSenderId: "1023579107561",
  appId: "1:1023579107561:web:ae4b2c5529f3c6daa50078",
  measurementId: "G-L5SEEFDEKZ",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
