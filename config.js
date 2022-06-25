import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD5i4hNN_x5R4v0tG3Bci5f9RUx-ad8vjM",
  authDomain: "custom-food-app-b8543.firebaseapp.com",
  projectId: "custom-food-app-b8543",
  storageBucket: "custom-food-app-b8543.appspot.com",
  messagingSenderId: "706704267938",
  appId: "1:706704267938:web:3110e1a9054dd33a9d95fb"
};

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();