import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const Config = {
  apiKey: "AIzaSyD1kKPuPI6RtNOMvu2G_xPcwlCxz4_YqA8",
  authDomain: "crwn-9630c.firebaseapp.com",
  projectId: "crwn-9630c",
  storageBucket: "crwn-9630c.appspot.com",
  messagingSenderId: "341295841748",
  appId: "1:341295841748:web:d4a6e8e0a4b91f7f569641"
};

// Initialize Firebase
const app = initializeApp(Config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (error.code === 'auth/cancelled-popup-request') {
      console.log('Popup request was cancelled.');
    } else if (error.code === 'auth/popup-blocked') {
      console.log('Popup was blocked by the browser. Please enable popups.');
      // You can also fallback to a redirect method
      // signInWithRedirect(auth, provider);
    } else {
      console.error('Error during sign-in:', error.message);
    }
  }
};

export default app;
