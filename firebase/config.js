

import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7bV3o3GUfcU3mDuTp3aFp9YAszlkenDg",
  authDomain: "react-native-app-28333.firebaseapp.com",
  projectId: "react-native-app-28333",
  storageBucket: "react-native-app-28333.appspot.com",
  messagingSenderId: "1019585881528",
  appId: "1:1019585881528:web:0768af43d64d6dac159b4d",
  measurementId: "G-EMQY2YH42H"
};


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;