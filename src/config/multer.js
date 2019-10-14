import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

import s3 from './s3';
import Dish from '../models/dish.model';

const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'leftovers-app',
    metadata: function (req, file, callback) {
      callback(null, { ...req.body });
    },
    key: function (req, file, callback) {
      const key = `${Date.now().toString()}${path.extname(file.originalname)}`
      callback(null, key);
    }
  })
})

export default upload;
