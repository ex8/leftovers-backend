import { Router } from 'express';

import { list, create, detail, update, remove } from '../controllers/dish.controller';
import passport from '../config/passport';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), list);
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.get('/:id', passport.authenticate('jwt', { session: false }), detail);
router.put('/:id', passport.authenticate('jwt', { session: false }), update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), remove);

export default router;
