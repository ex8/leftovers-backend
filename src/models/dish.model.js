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
  // location: { 
  //   type: { 
  //     type: String, 
  //     default: 'Point' 
  //   }, 
  //   coordinates: [Number],
  //   required: true,
  // },
  // availablePickupTimes: [],
  // reviews: [],
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// dishSchema.index({ location: "2dsphere" });

export default model('Dish', dishSchema);
