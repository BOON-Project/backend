const Task = require('../models/Task');
const User = require('../models/User')

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
        // res.json(updatedTask)


    //Update also the user rating
    const booner = updatedTask.booner;
    console.log(booner);

    const userTasks = await Task.find({booner})

    const updatedRating = userTasks.reduce((acc,curr)=>{
      console.log(curr.rating);
        acc+=curr.rating;
        acc = acc/userTasks.length;
        return acc
    },0)

  const taskRating = await User.findByIdAndUpdate(booner, {
    rating: updatedRating
  })
  // const userTodos = await Task.find( {booner});
  res.json(taskRating);
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
  const booner = id;
  console.log(req.params);

  const userTasks = await Task.find({booner})

  const updatedRating = userTasks.reduce((acc,curr)=>{
    console.log(curr.rating);
      acc+=curr.rating;
      acc = acc/userTasks.length;
      console.log(acc);
      return acc
  },0)


  const taskRating = await User.findByIdAndUpdate(booner, {
    rating: updatedRating
  })
  // const userTodos = await Task.find( {booner});
  res.json(taskRating);
};
