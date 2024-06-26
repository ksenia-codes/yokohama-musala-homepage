// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: process.env.REACT_APP_FB_API_KEY,

    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,

    projectId: process.env.REACT_APP_FB_PJ_ID,

    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,

    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,

    appId: process.env.REACT_APP_FB_APP_ID,

    measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export const storageRef = ref(storage);
export const auth = getAuth();