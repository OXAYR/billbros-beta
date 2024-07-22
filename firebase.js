import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC9ZJCk6eYdedH7Sd3ocNaKuhF4DgoSl_E',
  authDomain: 'billbrosv02.firebaseapp.com',
  databaseURL: 'https://billbrosv02-default-rtdb.firebaseio.com',
  projectId: 'billbrosv02',
  storageBucket: 'billbrosv02.appspot.com',
  messagingSenderId: '128522730079',
  appId: '1:128522730079:web:272aa439f44339034079ea',
  measurementId: 'G-5WLY36EZWS',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAH4vNGepfpx7frEsEXKydgv0IFFs-nvvs",
//   authDomain: "payper-dc255.firebaseapp.com",
//   databaseURL: "https://payper-dc255-default-rtdb.firebaseio.com",
//   projectId: "payper-dc255",
//   storageBucket: "payper-dc255.appspot.com",
//   messagingSenderId: "284333719565",
//   appId: "1:284333719565:web:0f964ae93e2e83f8129544",
//   measurementId: "G-4MS4CL8LKN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
