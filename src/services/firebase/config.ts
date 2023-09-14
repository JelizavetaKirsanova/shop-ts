import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAyDxrJA_Z_m6CK6JiVGk1F53IQHk1EWBY",
  authDomain: "shop-e6c08.firebaseapp.com",
  projectId: "shop-e6c08",
  storageBucket: "shop-e6c08.appspot.com",
  messagingSenderId: "670248990799",
  appId: "1:670248990799:web:7ef21e007481aa1a3e123a",
  measurementId: "G-Q7EP17ZTZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app, "gs://shop-e6c08.appspot.com/")


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);