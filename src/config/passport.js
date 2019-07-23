require('dotenv').config();
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import User from '../models/user.model';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

passport.use(new Strategy(opts, ({ id }, done) => {
  User.findById(id)
    .then(user => {
      if (user) return done(null, user);
      done(null, false);
    })
    .catch(err => done(err, null));
}));

export default passport;
