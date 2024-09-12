// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyATDnSF0a7_wRobPLLydKjiaz8fXIvnoos",
//   authDomain: "discomfort-689dd.firebaseapp.com",
//   projectId: "discomfort-689dd",
//   storageBucket: "discomfort-689dd.appspot.com",
//   messagingSenderId: "888866100324",
//   appId: "1:888866100324:web:6f9ce7af13def8abed7b71"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


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


