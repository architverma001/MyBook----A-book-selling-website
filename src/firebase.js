import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDvjIt1_9wWAvYvWZgtpzz7OMOJ29GRfeQ",
  authDomain: "my-application-88fc7.firebaseapp.com",
  databaseURL: "https://my-application-88fc7-default-rtdb.firebaseio.com",
  projectId: "my-application-88fc7",
  storageBucket: "my-application-88fc7.appspot.com",
  messagingSenderId: "755742675573",
  appId: "1:755742675573:web:079f0dd35ff0ec9f1d9e3c",
  measurementId: "G-MYT21MQE4Q"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore()