
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALy-rDcz7l5VWvybpmomwwAUQj7TeYJs4",
  authDomain: "home-cooking-app-c2aef.firebaseapp.com",
  projectId: "home-cooking-app-c2aef",
  storageBucket: "home-cooking-app-c2aef.appspot.com",
  messagingSenderId: "125789319678",
  appId: "1:125789319678:web:9579e0032f6e6e8a7ad0af",
  measurementId: "G-MK0JY5SFHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()