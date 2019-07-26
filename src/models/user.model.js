require('dotenv').config();
import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const userSchema = new Schema({
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  email: { type: String, required: true, unique: true, },
  phone: { type: String, required: true, },
  streetName: { type: String, required: true, },
  city: { type: String, required: true, },
  state: { type: String, required: true, },
  zipCode: { type: String, required: true, },
  username: { type: String, required: true, unique: true, },
  password: { type: String, required: true, },
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
    address: this.address,
    username: this.username,
    createdAt: this.createdAt,
  };
  return sign(payload, process.env.JWT_KEY, { expiresIn: '4h' });
};

export default model('User', userSchema);
