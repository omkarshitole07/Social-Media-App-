// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVLH2NAlqBLOCD0I7OD2JNMJh-YdBdHPM",
  authDomain: "social-media-app-8cccc.firebaseapp.com",
  projectId: "social-media-app-8cccc",
  storageBucket: "social-media-app-8cccc.appspot.com",
  messagingSenderId: "165286275974",
  appId: "1:165286275974:web:275ba3c520fd2182d71a07",
  measurementId: "G-T79GV7RPPP"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db , storage};

