import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCPPMIKyIdYbofaZezAIzPbwcZcLPxQ--o",
  authDomain: "image-gallery-15aab.firebaseapp.com",
  projectId: "image-gallery-15aab",
  storageBucket: "image-gallery-15aab.appspot.com",
  messagingSenderId: "90228021893",
  appId: "1:90228021893:web:33206653a2a73551bba7ec"
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const store = getFirestore(app);
export { auth, store, app };