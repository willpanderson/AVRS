// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAcFrWrr7Crw4qMKKB-2AG3PhKcDH2kfqk',
  authDomain: 'avrs-29e3d.firebaseapp.com',
  projectId: 'avrs-29e3d',
  storageBucket: 'avrs-29e3d.appspot.com',
  messagingSenderId: '452168744554',
  appId: '1:452168744554:web:9634d0e099cfd33dd8d413',
  measurementId: 'G-3NELSQK0TZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
console.log('firebase ' + auth);

export {auth, db};
