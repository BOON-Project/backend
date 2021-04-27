const Task = require('../models/Task');

// ADD - this point it should contain one userID
exports.addTask = async (req, res, next) => {
    const info = req.body;
    try {
      const task = await Task.create(info);
      res.json(task);
    } catch (err) {
      next(err);
    }
};

// ADD THESE STATUSES: accepted, rejected, finished and confirmed
exports.updateTask = async (req, res, next) => {
  const {id} = req.params
  const {status, rating} = req.body;
  try {
    if(!rating){
        let updatedTask = await Task.findByIdAndUpdate(id, { status})
    }
    let updatedTask = await Task.findByIdAndUpdate(id, { status, rating})
    
    res.json(updatedTask)
  } catch (err) {
      next(err);
    }
};

exports.getTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    res.json(task);

  } catch (err) {
    next(err);
  }
};


exports.getTasks = async (req, res, next) => {
  let allTasks = await Task.find().populate('userId'); 
  res.json(allTasks);
};


exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    let taskToDelete = await Task.findByIdAndDelete(id);
    res.json(taskToDelete);
  } catch (err) {
    let error = new Error(`Todo with ID ${id} does not exist`);
    error.status = 400;
    next(error);
  }
}; 

exports.getUserTasks = async (req, res, next) => {
  const { id } = req.params;
  const boonee = id;
  console.log(req.params);
  const userTodos = await Task.find( {boonee});
  res.json(userTodos);
};
