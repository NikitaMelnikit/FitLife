import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDpSLYnyDFEOy9nY1SSfs8nseofDA4Pgnc",
  authDomain: "fitlife-6b42f.firebaseapp.com",
  projectId: "fitlife-6b42f",
  storageBucket: "fitlife-6b42f.firebasestorage.app",
  messagingSenderId: "631638753845",
  appId: "1:631638753845:web:c46948de743862f86ba77c",
  measurementId: "G-L6540742KJ"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
