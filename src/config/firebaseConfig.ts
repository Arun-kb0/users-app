import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB15lg_XCj2HrzAYBG7JjzVK966zHjZGbo",
  authDomain: "olx-clone-93ed4.firebaseapp.com",
  projectId: "olx-clone-93ed4",
  storageBucket: "olx-clone-93ed4.appspot.com",
  messagingSenderId: "335643274705",
  appId: "1:335643274705:web:7f0f41b89b2f0d49a2c4f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const fireStoreDb = getFirestore(app)
export const storage = getStorage(app)
