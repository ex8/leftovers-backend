require('dotenv').config();
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import { connect } from 'mongoose';
import cors from 'cors';

import passport from './config/passport';
import authRouter from './routes/auth.routes';
import dishRouter from './routes/dish.routes';
import searchRouter from './routes/search.routes';
import orderRouter from './routes/order.routes';

const app = express();

connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(`MongoDB connection error: ${err}`));

app.use(logger('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/orders', orderRouter);
app.use('/api/search', searchRouter);

app.listen(4000, () => console.log(`Backend running...`));
