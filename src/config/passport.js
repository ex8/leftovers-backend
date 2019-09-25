require('dotenv').config();
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import User from '../models/user.model';
import Chef from '../models/chef.model';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

passport.use('user-jwt', new Strategy(opts, ({ id }, done) => {
  User.findById(id)
    .then(user => {
      if (user) return done(null, user);
      done(null, false);
    })
    .catch(err => done(err, null));
}));

passport.use('chef-jwt', new Strategy(opts, ({ id }, done) => {
  Chef.findById(id)
    .then(chef => {
      if (chef) return done(null, chef);
      done(null, false);
    })
    .catch(err => done(err, null));
}));

export default passport;
