import { Router } from 'express';

import passport from '../config/passport';
import { me, login, signup } from '../controllers/chef.controller';

const router = Router();

router.get('/me', passport.authenticate('chef-jwt', { session: false }), me);
router.post('/login', login);
router.post('/signup', signup);

export default router;
