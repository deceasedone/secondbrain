// server/src/routes/content.routes.ts
import { Router } from 'express';
import { RequestHandler } from 'express';
import { 
  getAllContent, 
  getContentById, 
  createContent, 
  updateContent, 
  deleteContent 
} from '../controllers/content.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(protect as RequestHandler);

// Route handlers
router.get('/', getAllContent as RequestHandler);
router.post('/', createContent as RequestHandler);
router.get('/:id', getContentById as RequestHandler);
router.put('/:id', updateContent as RequestHandler);
router.delete('/:id', deleteContent as RequestHandler);

export default router;