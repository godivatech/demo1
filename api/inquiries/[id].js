// API handler for /api/inquiries/[id]
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, remove, set } from 'firebase/database';

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

// Delete data from Firebase
const deleteFromFirebase = async (path, id) => {
  try {
    const db = getDatabase(firebaseApp);
    // Get all items first to find the item with matching id
    const dataRef = ref(db, path);
    const snapshot = await get(dataRef);
    
    if (!snapshot.exists()) {
      return { success: false, message: 'No data found' };
    }

    const data = snapshot.val();
    
    // If data is an array, find the index with matching id
    if (Array.isArray(data)) {
      const index = data.findIndex(item => item && item.id === parseInt(id));
      if (index === -1) {
        return { success: false, message: 'Item not found' };
      }
      
      // Create new array without the deleted item
      const updatedData = [...data.slice(0, index), ...data.slice(index + 1)];
      await remove(dataRef); // Remove all data
      
      // If there are remaining items, set them back
      if (updatedData.length > 0) {
        const db = getDatabase(firebaseApp);
        const dataRef = ref(db, path);
        await set(dataRef, updatedData);
      }
      
      return { success: true };
    } 
    // If data is an object with keys
    else if (data && typeof data === 'object') {
      // Find the key that has an object with matching id
      let targetKey = null;
      for (const key in data) {
        if (data[key] && data[key].id === parseInt(id)) {
          targetKey = key;
          break;
        }
      }
      
      if (!targetKey) {
        return { success: false, message: 'Item not found' };
      }
      
      // Remove the specific item
      const itemRef = ref(db, `${path}/${targetKey}`);
      await remove(itemRef);
      
      return { success: true };
    }
    
    return { success: false, message: 'Invalid data structure' };
  } catch (error) {
    console.error(`Error deleting from ${path}:`, error);
    return { success: false, message: error.message };
  }
};

// Handler for API routes
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Get ID from the URL
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  
  const firebasePath = 'inquiries';
  
  try {
    // Handle DELETE requests
    if (req.method === 'DELETE') {
      const result = await deleteFromFirebase(firebasePath, id);
      
      if (result.success) {
        return res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
      } else {
        return res.status(404).json({ error: result.message || 'Delete operation failed' });
      }
    }
    
    // If we get here, the method is not supported
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(`Error in Inquiry API handler:`, error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}