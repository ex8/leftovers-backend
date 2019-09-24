import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  username: { type: String, required: true, unique: true, },
  about: { type: String },
  rating: { type: Number, min: 0, max: 5, default: 0, },
  reviews: [],
  social: {},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

export default model('Profile', profileSchema);
