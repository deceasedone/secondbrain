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

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/auth', authRoutes);

// Global error handler - must be after routes
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
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