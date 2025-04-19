export const getFirebaseConfig = () => {
  // Use environment variables if available, otherwise use hardcoded values (development only)
  return {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCMOdvQW248_4ul-ciFEEmuOghb4xdS3gs",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "jpfinserv-892e1.firebaseapp.com",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "https://jpfinserv-892e1-default-rtdb.firebaseio.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "jpfinserv-892e1",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "jpfinserv-892e1.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "166323272116",
    appId: process.env.FIREBASE_APP_ID || "1:166323272116:web:f440b4c76307ea463c5ae1",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-GBS93JTW1R"
  };
};