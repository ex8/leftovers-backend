import { Schema, model } from 'mongoose';

const dishSchema = new Schema({
  images: [String],
  title: { type: String, required: true, },
  description: { type: String, required: true, },
  stock: { type: Number, required: true, },
  price: { type: Number, required: true, },
  isVerified: { type: Boolean, default: false, },
  tags: [String],
  ingredients: [String],
  rating: { type: Number, min: 0, max: 5, default: 0, },
  pickupAddress: { type: String, required: true, },
  // availablePickupTimes: [],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  // reviews: [],
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Chef',
    required: true,
  },
}, { timestamps: true });

dishSchema.index({ location: "2dsphere" });

export default model('Dish', dishSchema);
