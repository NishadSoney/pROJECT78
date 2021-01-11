import firebase from 'firebase';
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyDb7zuHTc6_2-qoHPdY5CkmTpC-HdTytCU",
    authDomain: "book-santa-e30d3.firebaseapp.com",
    projectId: "book-santa-e30d3",
    storageBucket: "book-santa-e30d3.appspot.com",
    messagingSenderId: "514984769686",
    appId: "1:514984769686:web:bafa5610da25620fc86ab7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();