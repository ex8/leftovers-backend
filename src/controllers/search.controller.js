import Dish from '../models/dish.model';

const search = (req, res) => {
  const { s, p } = req.query;
  Dish
  .find({
    title: { $regex: new RegExp(s, 'i') },
    // description: { $regex: new RegExp(s, 'i') },
    // tags: { $regex: s, $options: 'i' },
    // ingredients: { $regex: s, $options: 'i' },
    // $text: {
    //   $search: s,
    // },
  })
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

const detail = (req, res) => {
  Dish
    .findById(req.params.id)
    .populate('chef')
    .then(dish => res.json({
      success: true,
      dish,
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
      dishes,
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
      dishes,
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

const dishesByChef = (req, res) => {
  Dish
    .find({ chef: req.params.id })
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

export {
  search,
  detail,
  popular,
  newest,
  dishesByChef
};
