// Client-side Firebase configuration
// This file provides Firebase initialization for the frontend

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_z0qWOAl1UIKd-eVP_9Q-o24tYu97T3k",
  authDomain: "om-vinayaga-associates.firebaseapp.com",
  databaseURL: "https://om-vinayaga-associates-default-rtdb.firebaseio.com",
  projectId: "om-vinayaga-associates",
  storageBucket: "om-vinayaga-associates.firebasestorage.app",
  messagingSenderId: "275733848538",
  appId: "1:275733848538:web:9528676a7fbd29190da0e3",
  measurementId: "G-06H69CNSS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
