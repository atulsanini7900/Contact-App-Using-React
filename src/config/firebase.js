// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9g7CPO-ysufmGa0dQv7E4rdVIQqhEaDQ",
  authDomain: "contact-app-3416f.firebaseapp.com",
  projectId: "contact-app-3416f",
  storageBucket: "contact-app-3416f.appspot.com",
  messagingSenderId: "604017118422",
  appId: "1:604017118422:web:4327a50b86cc146d438d77"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);