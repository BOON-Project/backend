exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    Object.assign(user, req.body);
    const userUpdated = await user.save();
    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
};
