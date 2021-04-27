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

// PENDING TASK 
  //- someone chooses this task and gets in touch with the task taskee
  //- should include multiple ids: taskee and tasker
exports.pendingTask 

// REJECTED TASK - the taskee refuses the offer
  // - should it be deleted?????????????????????
exports.rejectedTask = async (req, res, next) => {
  const {id} = req.params;
  try {
      let taskRejected = await Task.findByIdAndUpdate(id, 
          { status: "rejected"}
      )
      res.json(taskRejected)
  } catch (err) {
      next(err);
    }
};

// ACCEPTED TASK - success!
exports.acceptedTask = async (req, res, next) => {
  const {id} = req.params;
  try {
      let taskAccepted = await Task.findByIdAndUpdate(id, 
          { status: "accepted"}
      )
      res.json(taskAccepted)
  } catch (err) {
      next(err);
    }
};

// FINISHED TASK 
  // -taskee cofirms that she/he/they did the task
exports.finishedTask

// CONFIRMED TASK
  // - both status and rating changes
  // - task taker confirms the task
exports.confirmedTask

exports.updateTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    let updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
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


//CHECK THIS BECEUSE I AM NOT SURE IF THIS DOES WHAT I WANT IT TO
exports.getTasks = async (req, res, next) => {
  let allTasks = await Task.find().populate('userId'); // grab user document and replace ID by user data
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
