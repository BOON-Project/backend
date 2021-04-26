const Task = require('../models/Task');

// ADD
exports.addTask = async (req, res, next) => {
    const info = req.body;
    try {
      const task = await Task.create(info);
      res.json(task);
    } catch (err) {
      next(err);
    }
  };

  // rate reject accept
  //reject or accept status??
  //accepted, rejected, pending, finished and confirmed

  // ACCEPT rating

exports.updateTask = async (req, res, next) => {
    const {id} = req.params;
    try {
        let acceptedTask = await Task.findByIdAndUpdate(id, 
            { status: "accepted"}
        )
        res.json(acceptedTask)
    } catch (err) {
        next(err);
      }
};