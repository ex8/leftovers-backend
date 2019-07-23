import User from '../models/user.model';
import { compare } from 'bcryptjs';

const me = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

const login = ({ body: { email, password } }, res) => {
  User.findOne({ email })
    .then(user => {
      if (!user) return res.json({
        success: false,
        message: 'Incorrect email. Please try again.',
      });
      compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const token = user.generateJwt();
            return res.json({
              success: true,
              token,
            });
          }
          else {
            return res.json({
              success: false,
              message: 'Incorrect password. Please try again.'
            });
          }
        })
        .catch(err => res.json({
          success: false,
          err,
        }));
    })
    .catch(err => res.json({
      success: false,
      err,
    }));
};

const signup = (req, res) => {
  User.create({
      ...req.body,
    })
    .then(user => res.json({
      success: true,
      user,
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

export {
  me,
  login,
  signup
};
