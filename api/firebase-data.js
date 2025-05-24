// Firebase data endpoints for Vercel
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

// Create data in Firebase
const createDataInFirebase = async (path, data) => {
  try {
    const db = getDatabase(firebaseApp);
    const dataRef = ref(db, path);
    
    // First, get existing data
    const snapshot = await get(dataRef);
    let existingData = [];
    
    if (snapshot.exists()) {
      const current = snapshot.val();
      existingData = Array.isArray(current) ? current : Object.values(current);
    }
    
    // Generate a new ID (max ID + 1)
    const newId = existingData.length > 0 
      ? Math.max(...existingData.map(item => item?.id || 0)) + 1 
      : 1;
    
    // Add ID and creation date to new item
    const newItem = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString()
    };
    
    // Add to array and save back to Firebase
    const updatedData = [...existingData, newItem];
    await set(dataRef, updatedData);
    
    return { success: true, data: newItem };
  } catch (error) {
    console.error(`Error creating data in ${path}:`, error);
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
  
  // Extract the path from the URL
  const { url } = req;
  const pathMatch = url.match(/\/api\/([a-zA-Z]+)(\/(\d+))?$/);
  
  if (!pathMatch || !pathMatch[1]) {
    return res.status(400).json({ error: 'Invalid API path' });
  }
  
  const dataType = pathMatch[1];
  const id = pathMatch[3]; // This will be undefined for collection-level endpoints
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
    // Handle GET requests
    if (req.method === 'GET') {
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
    }
    
    // Handle POST requests - for form submissions
    if (req.method === 'POST') {
      // Parse the request body
      const formData = req.body;
      
      if (!formData) {
        return res.status(400).json({ error: 'Request body is required' });
      }
      
      // Create data in Firebase
      const result = await createDataInFirebase(firebasePath, formData);
      
      if (result.success) {
        return res.status(200).json({ 
          success: true, 
          message: `${dataType.slice(0, -1)} submitted successfully`,
          data: result.data 
        });
      } else {
        return res.status(500).json({ error: result.message || 'Submission failed' });
      }
    }
    
    // Handle DELETE requests
    if (req.method === 'DELETE') {
      // We need an ID for delete operations
      if (!id) {
        return res.status(400).json({ error: 'ID is required for DELETE operations' });
      }
      
      const result = await deleteFromFirebase(firebasePath, id);
      
      if (result.success) {
        return res.status(200).json({ success: true, message: `${dataType.slice(0, -1)} deleted successfully` });
      } else {
        return res.status(404).json({ error: result.message || 'Delete operation failed' });
      }
    }
    
    // If we get here, the method is not supported
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(`Error in API handler for ${dataType}:`, error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}