import firebase from 'firebase'; 

var config = {
    apiKey: "AIzaSyDCpMARap7VdOPGK7ObX9FauDXen31LRvA",
    authDomain: "pipepro-75497.firebaseapp.com",
    databaseURL: "https://pipepro-75497.firebaseio.com",
    projectId: "pipepro-75497",
    storageBucket: "pipepro-75497.appspot.com",
    messagingSenderId: "838671275573",
    appId: "1:838671275573:web:93da012ddab550a7aa437c",
    measurementId: "G-JHE3L9F9H5"
};

let firebaseConfig = firebase.initializeApp(config);
export default firebaseConfig;
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();