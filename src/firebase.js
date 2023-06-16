import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCuakEojVvVd2B0cgOdnCWUu_g--QhKnDo",
  authDomain: "lecturebasketdatabase.firebaseapp.com",
  projectId: "lecturebasketdatabase",
  storageBucket: "lecturebasketdatabase.appspot.com",
  messagingSenderId: "427065908668",
  appId: "1:427065908668:web:bb5b21145d789fbd1d9fb9",
  measurementId: "G-FM484HBFBK"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore()