import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBSPWhoc4tF6FNKoResjSzopI9-fsg04aU',
    authDomain: 'medapp-f09bc.firebaseapp.com',
    projectId: 'medapp-f09bc',
    storageBucket: 'medapp-f09bc.appspot.com',
    messagingSenderId: '961024259822',
    appId: '1:961024259822:web:58982aabf326d1020325ff',
    measurementId: 'G-8BLGW7C6DK'
};

// Initialize Firebase
let app;
let auth;
let firestore;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
    firestore = getFirestore(app);
} else {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
}

console.log('Firebase initialized successfully', {
    auth,
    firestore,
});

export { auth, firestore };
