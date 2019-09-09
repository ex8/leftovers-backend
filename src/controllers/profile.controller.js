import Profile from '../models/profile.model';

const detail = (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => res.json({
      success: true,
      profile,
    }))
    .catch(err => res.json({
      success: false,
      err,
    }));
};

const create = (req, res) => {
  
};

const update = (req, res) => {

};

export {
  detail,
  create,
  update,
};
