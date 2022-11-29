// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQZ-PnNjybN84t8Tdiacz7MEhdJL89xVA",
  authDomain: "gatornetics-auth.firebaseapp.com",
  projectId: "gatornetics-auth",
  storageBucket: "gatornetics-auth.appspot.com",
  messagingSenderId: "617464316077",
  appId: "1:617464316077:web:e6b593c8274a2b30038624",
  measurementId: "G-19P1H4CCM0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}
