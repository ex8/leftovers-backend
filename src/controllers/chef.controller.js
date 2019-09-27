import Chef from '../models/chef.model';
import { compare } from 'bcryptjs';

const me = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

const login = ({ body: { email, password } }, res) => {
  Chef.findOne({ email })
    .then(chef => {
      if (!chef) return res.json({
        success: false,
        message: 'Incorrect email. Please try again.',
      });
      compare(password, chef.password)
        .then(isMatch => {
          if (isMatch) {
            const token = chef.generateJwt();
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
  const { 
    firstName, lastName, email, phone, username, password,
    address, driversLicenseImage, bio, social,
  } = req.body;

  Chef.find({ $or: [{ email }, { username }] })
    .then(chefs => {
      if (chefs.length) {
        return res.json({
          success: false,
          message: 'Email or username already exists. Please try again.'
        });
      }
      else {
        Chef.create({
          firstName, 
          lastName, 
          email, 
          phone, 
          username, 
          password,
          address, 
          driversLicenseImage, 
          bio, 
          social,
        })
        .then(chef => res.json({
          success: true,
          chef,
        }))
        .catch(err => res.json({
          success: false,
          err,
        }));
      }
    })
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
