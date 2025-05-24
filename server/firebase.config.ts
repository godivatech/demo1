export const getFirebaseConfig = () => {
  // Use environment variables if available, otherwise use hardcoded values (development only)
  return {
    apiKey:
      process.env.FIREBASE_API_KEY || "AIzaSyA_z0qWOAl1UIKd-eVP_9Q-o24tYu97T3k",
    authDomain:
      process.env.FIREBASE_AUTH_DOMAIN ||
      "om-vinayaga-associates.firebaseapp.com",
    databaseURL:
      process.env.FIREBASE_DATABASE_URL ||
      "https://om-vinayaga-associates-default-rtdb.firebaseio.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "om-vinayaga-associates",
    storageBucket:
      process.env.FIREBASE_STORAGE_BUCKET ||
      "om-vinayaga-associates.firebasestorage.app",
    messagingSenderId:
      process.env.FIREBASE_MESSAGING_SENDER_ID || "275733848538",
    appId:
      process.env.FIREBASE_APP_ID ||
      "1:275733848538:web:9528676a7fbd29190da0e3",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-06H69CNSS1",
  };
};
