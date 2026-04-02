// controllers/taskController.js
const Task = require('../models/taskModel');

const calculateTimeInHours = (startTime, endTime) => {
    const diffInMilliseconds = new Date(endTime).getTime() - new Date(startTime).getTime();
    return diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
  };
  

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Fetch task summary for the dashboard
const getTaskSummary = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = totalTasks - completedTasks;

    const completedPercentage = totalTasks === 0 ? 0 :(completedTasks / totalTasks) * 100;
    const pendingPercentage = totalTasks === 0 ? 0 : (pendingTasks / totalTasks) * 100;

    const totalElapsedTime = tasks.reduce((acc, task) => {
        return acc + calculateTimeInHours(task.startTime, task.endTime);
    }, 0);

    const averageCompletionTime = totalTasks > 0 ? totalElapsedTime / totalTasks : 0;

    // Pending task calculations
    const pendingTasksSummary = tasks.filter(task => task.status === 'pending');
    const totalPendingTimeElapsed = pendingTasksSummary.reduce((acc, task) => {
      return acc + calculateTimeInHours(task.startTime, new Date());
    }, 0);

    const totalTimeToFinish = pendingTasksSummary.reduce((acc, task) => {
      return acc + calculateTimeInHours(new Date(), task.endTime);
    }, 0);

    res.json({
      totalTasks,
      completedPercentage,
      pendingPercentage,
      averageCompletionTime,
      pendingTasksSummary: {
        totalPendingTasks: pendingTasksSummary.length,
        totalElapsedTime: totalPendingTimeElapsed,
        totalTimeToFinish,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task summary' });
  }
};

// Add a new task
const addTask = async (req, res) => {
  const { title, startTime, endTime, priority, status } = req.body;
  try {
    const newTask = new Task({
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      priority,
      status,
      userId: req.user.id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Error adding task' });
  }
};

// Edit an existing task
const editTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, startTime, endTime, priority, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, startTime: new Date(startTime), endTime: new Date(endTime), priority, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error editing task' });
  }
};

// Delete one or multiple tasks
const deleteTasks = async (req, res) => {
  const { taskIds } = req.body;
  try {
    await Task.deleteMany({ _id: { $in: taskIds }, userId: req.user.id });
    res.json({ message: 'Tasks deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting tasks' });
  }
};

// controllers/taskController.js

// Sorting and filtering tasks
const getSortedAndFilteredTasks = async (req, res) => {
    const { sortBy, filterByStatus, filterByPriority } = req.query;
  
    let filter = { userId: req.user.id };
    if (filterByStatus) filter.status = filterByStatus;
    if (filterByPriority) filter.priority = filterByPriority;
  
    let sort = {};
    if (sortBy === 'startTimeAsc') sort.startTime = 1;
    else if (sortBy === 'startTimeDesc') sort.startTime = -1;
    else if (sortBy === 'endTimeAsc') sort.endTime = 1;
    else if (sortBy === 'endTimeDesc') sort.endTime = -1;
  
    try {
      const tasks = await Task.find(filter).sort(sort);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching sorted/filtered tasks' });
    }
};
  

module.exports = {
  getAllTasks,
  getTaskSummary,
  addTask,
  editTask,
  deleteTasks,
  getSortedAndFilteredTasks
};
