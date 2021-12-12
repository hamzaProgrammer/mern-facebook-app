import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBmD68mrYLyBIgjiDDsU2evxP0TR7wxGh0",
  authDomain: "mernfacebookapp.firebaseapp.com",
  projectId: "mernfacebookapp",
  storageBucket: "mernfacebookapp.appspot.com",
  messagingSenderId: "201661490135",
  appId: "1:201661490135:web:abf73bb99a17ec68be6192",
  measurementId: "G-1ECJXLFP04"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export { storage , firebase as default }