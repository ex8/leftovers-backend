import { Router } from 'express';

import { search, popular, newest, detail } from '../controllers/search.controller';

const router = Router();

router.get('/', search);
router.get('/popular', popular);
router.get('/newest', newest);
router.get('/:id', detail);

export default router;
