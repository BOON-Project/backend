const Task = require("../models/Task");
const User = require("../models/User");
const Messages = require("../models/Messages");

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
  const { id } = req.params;
  const { status, rating } = req.body;
  try {
    let updatedTask;

    //First update the task
    if (!rating) {
      updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      updatedTask = await Task.findByIdAndUpdate(id, { rating }, { new: true });
    }

    //Get all the tasks where the user was booner
    const booner = updatedTask.booner;
    const boonerId = updatedTask.booner._id;
    // const status = updatedTask.status;
    const userTasks = await Task.find({ booner });

    //Get the rating average
    const userRating = userTasks.reduce((acc, curr) => {
      acc += curr.rating;
      acc = acc / userTasks.length;
      return acc;
    }, 0);

    // const userRatingFunction = () => {
    //   const rateTotal = userTasks
    //     .filter((item) => item.rating > 0)
    //     .map((item) => item.rating)
    //     .reduce((acc, cur) => acc + cur, 0);
    //   const ave = rateTotal / userTasks.length;

    //   return ave;
    // };
    //const userRating = userRatingFunction();

    //Update user rating
    const userUpdated = await User.findByIdAndUpdate(
      boonerId,
      {
        rating: userRating,
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id)
      .populate("booner")
      .populate("boonee")
      .populate("skill");
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  let allTasks = await Task.find()
    .populate("booner")
    .populate("boonee")
    .populate("skill");
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

  const userTasks = await Task.find({ booner });

  const updatedRating = userTasks.reduce((acc, curr) => {
    console.log(curr.rating);
    acc += curr.rating;
    acc = acc / userTasks.length;
    console.log(acc);
    return acc;
  }, 0);

  const taskRating = await User.findByIdAndUpdate(booner, {
    rating: updatedRating,
  });
  // const userTodos = await Task.find( {booner});
  res.json(taskRating);
};

exports.getUserTasksOffered = async (req, res, next) => {
  const { _id } = req.user;
  const booner = _id;
  console.log(req.user);

  const userTasks = await Task.find({ booner })
    .populate("booner")
    .populate("boonee")
    .populate("skill");
  res.json(userTasks);
};

exports.getUserTasksReceived = async (req, res, next) => {
  const { _id } = req.user;
  const boonee = _id;
  console.log(req.user);

  const userTasks = await Task.find({ boonee })
    .populate("booner")
    .populate("boonee")
    .populate("skill");
  res.json(userTasks);
};
