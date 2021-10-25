import firebase from "firebase";
import "@firebase/firestore";

console.log("init firebase");
const firebaseConfig = {
  apiKey: "AIzaSyAZgnfUV7hAv1eJpBVry7T0o7xm9qyjxRo",
  authDomain: "hci-leo.firebaseapp.com",
  projectId: "hci-leo",
  storageBucket: "hci-leo.appspot.com",
  messagingSenderId: "279549318888",
  appId: "1:279549318888:web:75a570fa6b470199c71b5d",
  measurementId: "G-KTXN2K41SR",
};
let Fire = firebase.initializeApp(firebaseConfig);

export default Fire;
