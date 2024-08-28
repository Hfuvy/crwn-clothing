import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const Config = {
  apiKey: "AIzaSyD1kKPuPI6RtNOMvu2G_xPcwlCxz4_YqA8",
  authDomain: "crwn-9630c.firebaseapp.com",
  projectId: "crwn-9630c",
  storageBucket: "crwn-9630c.appspot.com",
  messagingSenderId: "341295841748",
  appId: "1:341295841748:web:d4a6e8e0a4b91f7f569641"
};

const app = initializeApp(Config);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during sign-in:', error.message);
  }
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user:', error.message);
    }
  }
  return userRef;
};
