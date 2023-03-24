import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGEING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);