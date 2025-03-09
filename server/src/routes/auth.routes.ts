import { Router } from 'express';
import { RequestHandler } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);
router.get('/profile', protect as RequestHandler, getProfile as RequestHandler);

export default router; 