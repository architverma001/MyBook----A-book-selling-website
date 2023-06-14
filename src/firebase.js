import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDHnz7h5duyWyqR1v78hHFc8iqlt6kGBLw",
  authDomain: "my-application-88fc7.firebaseapp.com",
  databaseURL: "https://my-application-88fc7-default-rtdb.firebaseio.com",
  projectId: "my-application-88fc7",
  storageBucket: "my-application-88fc7.appspot.com",
  messagingSenderId: "755742675573",
  appId: "1:755742675573:web:a038a2f4f518a1a41d9e3c",
  measurementId: "G-6S5EB5EJQC"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore()