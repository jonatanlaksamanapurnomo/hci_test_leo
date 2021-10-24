import firebase from "firebase";
import '@firebase/firestore'

console.log("init firebase")
const firebaseConfig = {
    apiKey: "AIzaSyBqXr9_sjIkzFle6kccbaxn6xvd2bgJkL0",
    authDomain: "leo-hci-2.firebaseapp.com",
    projectId: "leo-hci-2",
    storageBucket: "leo-hci-2.appspot.com",
    messagingSenderId: "611617703717",
    appId: "1:611617703717:web:00e21e84fb7f3f4601bccc",
    measurementId: "G-E1VXVQMCM5"
};
let Fire = firebase.initializeApp(firebaseConfig);

export default Fire;