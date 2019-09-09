require('dotenv').config();
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import { connect } from 'mongoose';
import cors from 'cors';

import passport from './config/passport';
import searchRouter from './routes/search.routes';
import authRouter from './routes/auth.routes';
import dishRouter from './routes/dish.routes';
import profileRouter from './routes/profile.routes';

const app = express();
const port = process.env.API_PORT || 4000;
const dbURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/leftovers'; 

connect(dbURL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log(`MongoDB connected to ${dbURL}`))
  .catch(err => console.error(`MongoDB connection error: ${err}`));

app.use(logger('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/search', searchRouter);
app.use('/api/auth', authRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/profile', profileRouter);

app.listen(port, () => console.log(`Backend running on port ${port}`));
