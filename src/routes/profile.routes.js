import { Router } from 'express';

import { detail, create, update } from '../controllers/profile.controller';
import passport from '../config/passport';

const router = Router();

router.get('/:id', detail);
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.put('/:id', passport.authenticate('jwt', { session: false }), update);

export default router;
