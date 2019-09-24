require('dotenv').config();
import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const userSchema = new Schema({
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  email: { type: String, required: true, unique: true, },
  password: { type: String, required: true, },
  phone: { type: String, required: true, },
  isChef: { type: Boolean, default: false, },
  // Profile fields -> filled in during Become A Chef (chefs only)
  streetName: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  // add Profile model here...
}, { timestamps: true, });

userSchema.virtual('address').get(function() {
  const { streetName, city, state, zipCode } = this;
  return `${streetName}, ${city}, ${state} ${zipCode}`;
});

userSchema.pre('save', function(next) {
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

userSchema.methods.generateJwt = function() {
  const payload = {
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    createdAt: this.createdAt,
    isChef: this.isChef,
  };
  return sign(payload, process.env.JWT_KEY, { expiresIn: '4h' });
};

export default model('User', userSchema);
