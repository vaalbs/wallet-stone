import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAZS1rQJng7FodndyqB0FaASQVjwKyQItM",
  authDomain: "wallet-stone-865a7.firebaseapp.com",
  databaseURL: "https://wallet-stone-865a7.firebaseio.com",
  projectId: "wallet-stone-865a7",
  storageBucket: "wallet-stone-865a7.appspot.com",
  messagingSenderId: "110197527278",
  appId: "1:110197527278:web:41c5eef33b5441d572d9ff",
};

const firebaseRef = firebase.initializeApp(firebaseConfig);

export default firebaseRef;
