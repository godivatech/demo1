// Firebase data endpoints for Vercel
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

// Get Firebase config
const getFirebaseConfig = () => {
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

// Initialize Firebase app
let firebaseApp;
try {
  const firebaseConfig = getFirebaseConfig();
  firebaseApp = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Get data from Firebase based on path
const getDataFromFirebase = async (path) => {
  try {
    const db = getDatabase(firebaseApp);
    const dataRef = ref(db, path);
    const snapshot = await get(dataRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      
      // Convert object to array if it's not already one
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return Object.values(data);
      }
      
      // Ensure we return an array
      return Array.isArray(data) ? data : [];
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${path} from Firebase:`, error);
    return [];
  }
};

// Handler for API routes
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only handle GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Extract the path from the URL
  const { url } = req;
  const pathMatch = url.match(/\/api\/([a-zA-Z]+)(\/.*)?$/);
  
  if (!pathMatch || !pathMatch[1]) {
    return res.status(400).json({ error: 'Invalid API path' });
  }
  
  const dataType = pathMatch[1];
  let firebasePath;
  
  // Map API endpoint to Firebase data path
  switch (dataType) {
    case 'inquiries':
      firebasePath = 'inquiries';
      break;
    case 'contacts':
      firebasePath = 'contacts';
      break;
    case 'intents':
      firebasePath = 'intents';
      break;
    case 'products':
      firebasePath = 'products';
      break;
    case 'services':
      firebasePath = 'services';
      break;
    case 'testimonials':
      firebasePath = 'testimonials';
      break;
    case 'faqs':
      firebasePath = 'faqs';
      break;
    default:
      return res.status(404).json({ error: 'Data type not found' });
  }
  
  try {
    // Get data from Firebase
    let data = await getDataFromFirebase(firebasePath);
    
    // Special handling for products to match API format
    if (dataType === 'products') {
      return res.status(200).json({
        success: true,
        products: Array.isArray(data) ? data : []
      });
    }
    
    // For all other endpoints, return array directly
    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error(`Error in API handler for ${dataType}:`, error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}