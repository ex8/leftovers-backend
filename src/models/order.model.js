import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  completed: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
  },
  items: [{
    quantity: {
      type: Number,
      default: 0,
    },
    dish: {
      type: Schema.Types.ObjectId,
      ref: 'Dish',
      required: true,
    },
  }],
  consumer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default model('Order', orderSchema);
