require('dotenv').config();
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import { connect } from 'mongoose';

import passport from './config/passport';
import authRouter from './routes/auth.routes';

const app = express();
const port = process.env.SERVER_PORT || 4000;
const dbURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/leftovers'; 

connect(dbURL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log(`MongoDB connected to ${dbURL}`))
  .catch(err => console.error(`MongoDB connection error: ${err}`));

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Backend running on port ${port}`));
