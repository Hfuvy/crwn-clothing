
// src/firebase/firebase.utils.js

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const Config = {
  apiKey: "AIzaSyD1kKPuPI6RtNOMvu2G_xPcwlCxz4_YqA8",
  authDomain: "crwn-9630c.firebaseapp.com",
  projectId: "crwn-9630c",
  storageBucket: "crwn-9630c.appspot.com",
  messagingSenderId: "341295841748",
  appId: "1:341295841748:web:d4a6e8e0a4b91f7f569641"
};


const app = initializeApp(Config);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during sign-in:', error.message);
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await firebaseSignInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing in with email and password:', error.message);
  }
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userDocRef = doc(db, `users/${userAuth.uid}`);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user profile', error.message);
    }
  }
  return userDocRef;
};

export { auth, db };
