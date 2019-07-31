import Dish from '../models/dish.model';

const list = (req, res) => {
  Dish.find({ chef: req.user.id })
    .then(dishes => res.json({
      success: true,
      dishes,
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

const create = (req, res) => {
  const { title, description, stock, price } = req.body;
  Dish.create({
    title,
    description,
    stock,
    price,
    chef: req.user.id
  })
    .then(dish => res.json({
      success: true,
      dish,
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

const detail = (req, res) => {
  Dish.findOne({
    _id: req.params.id,
    chef: req.user.id,
  })
    .then(dish => res.json({
      success: true,
      dish,
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

const update = (req, res) => {
  Dish.findOneAndUpdate({
    _id: req.params.id,
    chef: req.user.id,
  }, req.body, { new: true })
    .then(dish => res.json({
      success: true,
      dish,
    }))
    .catch(err => res.json({
      err,
    }));
};

const remove = (req, res) => {
  Dish.findOneAndDelete({
    _id: req.params.id,
    chef: req.user.id,
  })
    .then(dish => res.json({
      success: true,
      dish,
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

export {
  list,
  create,
  detail,
  update,
  remove,
};
