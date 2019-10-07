require('dotenv').config();
import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const chefSchema = new Schema({
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  email: { type: String, required: true, unique: true, },
  phone: { type: String, required: true, },
  password: { type: String, required: true, },
  address: { type: String, required: true, },
  driversLicenseImage: { type: String, required: true, },
  username: { type: String, unique: true, required: true },
  bio: { type: String, },
  social: {
    facebook: { type: String, },
    twitter: { type: String, },
    instagram: { type: String, },
  },
  rating: { type: Number, min: 0, max: 5, default: 0, },
  reviews: [String],
}, { timestamps: true, });

chefSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  genSalt(10)
    .then(salt => {
      hash(this.password, salt)
        .then(hashed => {
          this.password = hashed;
          next();
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

chefSchema.methods.generateJwt = function() {
  const payload = {
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    username: this.username,
    createdAt: this.createdAt,
  };
  return sign(payload, process.env.JWT_KEY, { expiresIn: '4h' });
};

export default model('Chef', chefSchema);
