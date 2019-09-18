import { Router } from 'express';

import { list, create, detail, update, remove } from '../controllers/dish.controller';
import passport from '../config/passport';
import upload from '../config/multer';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), list);
router.post('/', passport.authenticate('jwt', { session: false }), upload.array('images', 5), create);
router.get('/:id', passport.authenticate('jwt', { session: false }), detail);
router.put('/:id', passport.authenticate('jwt', { session: false }), update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), remove);

export default router;
