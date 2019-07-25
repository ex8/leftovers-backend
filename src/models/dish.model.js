import { Schema, model } from 'mongoose';

const dishSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('Dish', dishSchema);
