import Dish from '../models/dish.model';

const search = (req, res) => {
  const { s } = req.query;
  console.log(s);
  Dish
    .find({})
    .populate('chef')
    .then(dishes => res.json({
      success: true,
      dishes,
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

const popular = (req, res) => {
  Dish
    .find({})
    .sort('-rating')
    .limit(3)
    .populate('chef')
    .then(dishes => res.json({
      success: true, 
      dishes
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

const newest = (req, res) => {
  Dish
    .find({})
    .sort('-createdAt')
    .populate('chef')
    .limit(3)
    .then(dishes => res.json({
      success: true, 
      dishes
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

export {
  search,
  popular,
  newest,
};
