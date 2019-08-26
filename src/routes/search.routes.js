import { Router } from 'express';

import { search, popular, newest } from '../controllers/search.controller';

const router = Router();

router.get('/', search);
router.get('/popular', popular);
router.get('/newest', newest);

export default router;
