import { Router } from 'express';

import passport from '../config/passport';

const router = Router();

router.get('/me', passport.authenticate('chef-jwt', { session: false }), () => {});

export default router;
