import express from 'express';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));

app.listen(4000, () => console.log(`Backend running...`));
