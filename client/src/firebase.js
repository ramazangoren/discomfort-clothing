import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "discomfort-689dd.firebaseapp.com",
  projectId: "discomfort-689dd",
  storageBucket: "discomfort-689dd.appspot.com",
  messagingSenderId: "888866100324",
  appId: "1:888866100324:web:6f9ce7af13def8abed7b71"
};
export const app = initializeApp(firebaseConfig);


