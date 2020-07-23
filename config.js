import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyANTjn_Rh9d9X8X6K-0Ii5wNgAqffP3mSE",
  authDomain: "booksanta-f83a2.firebaseapp.com",
  databaseURL: "https://booksanta-f83a2.firebaseio.com",
  projectId: "booksanta-f83a2",
  storageBucket: "booksanta-f83a2.appspot.com",
  messagingSenderId: "175408252469",
  appId: "1:175408252469:web:ced550f29550a8df31137c"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();