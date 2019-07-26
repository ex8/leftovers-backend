import { Schema, model } from 'mongoose';

const dishSchema = new Schema({
  // uuid ?
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
  timestamps: true,
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('Dish', dishSchema);
