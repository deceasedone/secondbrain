// server/src/routes/folder.routes.ts
import { Router } from 'express';
import { RequestHandler } from 'express';
import { 
  getAllFolders, 
  createFolder, 
  updateFolder,
  deleteFolder
} from '../controllers/folder.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(protect as RequestHandler);

// Route handlers
router.get('/', getAllFolders as RequestHandler);
router.post('/', createFolder as RequestHandler);
router.put('/:id', updateFolder as RequestHandler);
router.delete('/:id', deleteFolder as RequestHandler);

export default router;