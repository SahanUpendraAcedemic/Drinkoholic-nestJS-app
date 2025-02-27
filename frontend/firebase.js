// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIJKxby4VUQEvb8h6DeYZm0fFXfVmwVrM",
  authDomain: "drinkoholic-app.firebaseapp.com",
  projectId: "drinkoholic-app",
  storageBucket: "drinkoholic-app.firebasestorage.app",
  messagingSenderId: "205882666888",
  appId: "1:205882666888:web:9a4e1d70c8ebacf93a143d",
  measurementId: "G-KCWF1V808H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
