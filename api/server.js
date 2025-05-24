// Simple API server for Vercel
export default async function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Get the route from the URL
  const { url } = req;
  
  try {
    // Return a simple API response for testing
    return res.status(200).json({
      message: 'API endpoint working',
      endpoint: url,
      env: process.env.NODE_ENV,
      date: new Date().toISOString()
    });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({
      error: error.message || 'Something went wrong',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}