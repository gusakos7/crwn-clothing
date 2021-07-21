import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB2U8lYOuFAOFj6a5-ZTFm4sG1gEMiI6yM",
  authDomain: "crwn-db-a1ca2.firebaseapp.com",
  projectId: "crwn-db-a1ca2",
  storageBucket: "crwn-db-a1ca2.appspot.com",
  messagingSenderId: "260070039478",
  appId: "1:260070039478:web:7440dbf990be87174dab17",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return "USERAUTH DOESNT EXIST";

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log("error creating user", e.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
