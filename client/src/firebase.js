// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-59235.firebaseapp.com",
    projectId: "mern-blog-59235",
    storageBucket: "mern-blog-59235.appspot.com",
    messagingSenderId: "884701719084",
    appId: "1:884701719084:web:5597801f256385882abf89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

