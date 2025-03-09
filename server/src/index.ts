// server/src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contentRoutes from './routes/content.routes';
import folderRoutes from './routes/folder.routes';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/second-brain';

// CORS configuration with debugging
app.use(cors({
  origin: function(origin, callback) {
    console.log('Request origin:', origin);
    
    // For development/debugging - allow all origins
    // Remove this in production
    return callback(null, true);
    
    // Original CORS logic
    /*
    const allowedOrigins = ['https://secondbrain-pi.vercel.app', 'http://localhost:5173'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Origin ${origin} not allowed by CORS`);
      callback(new Error('Not allowed by CORS'), false);
    }
    */
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests explicitly
app.options('*', cors());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

// Routes with and without /api prefix
app.use('/content', contentRoutes);
app.use('/folders', folderRoutes);
app.use('/auth', authRoutes);

// Keep your existing routes
app.use('/api/content', contentRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/auth', authRoutes);

// Add a simple test endpoint
app.get('/test-cors', (req, res) => {
  console.log('Test CORS endpoint hit');
  res.header('Access-Control-Allow-Origin', 'https://secondbrain-pi.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).json({ message: 'CORS is working!' });
});

// Add debug logging for all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Add these direct route handlers for debugging
app.get('/direct-test', (req, res) => {
  res.status(200).json({ message: 'Direct GET test successful' });
});

app.post('/direct-test', (req, res) => {
  res.status(200).json({ message: 'Direct POST test successful', body: req.body });
});

// Global error handler with more detailed logging
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:');
  console.error('Request path:', req.path);
  console.error('Request method:', req.method);
  console.error('Error:', err);
  
  // Make sure CORS headers are set even in error responses
  res.header('Access-Control-Allow-Origin', 'https://secondbrain-pi.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  res.status(500).json({
    message: 'Internal server error',
    error: err.message
  });
});

// Connect to MongoDB with more detailed error handling
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app;