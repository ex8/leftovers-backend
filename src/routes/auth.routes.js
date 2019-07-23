import { Router } from 'express';

import { me, login, signup } from '../controllers/auth.controller';
import passport from '../config/passport';

const router = Router();

router.get('/me', passport.authenticate('jwt', { session: false }), me);
router.post('/login', login);
router.post('/signup', signup);

export default router;
