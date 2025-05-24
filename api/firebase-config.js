// Firebase configuration for Vercel environment
export const getFirebaseConfig = () => {
  // Retrieve Firebase configuration from environment variables
  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };
};

// For Vercel API routes
export default function handler(req, res) {
  // Return a safe version of the config (without actual values)
  return res.status(200).json({
    message: 'Firebase config available',
    config: {
      projectId: process.env.FIREBASE_PROJECT_ID || 'Not configured',
      databaseURL: process.env.FIREBASE_DATABASE_URL ? 'Configured' : 'Not configured',
      apiKeyConfigured: !!process.env.FIREBASE_API_KEY
    }
  });
}