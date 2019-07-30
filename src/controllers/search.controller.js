import Dish from '../models/dish.model';

const search = (req, res) => {
  const { s } = req.query;
  console.log(s);
  Dish.find({})
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
};
