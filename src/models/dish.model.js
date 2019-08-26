import { Schema, model } from 'mongoose';

const dishSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [String],
  ingredients: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default model('Dish', dishSchema);
