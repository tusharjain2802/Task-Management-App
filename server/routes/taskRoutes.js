// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.get('/', authMiddleware, taskController.getAllTasks); // Fetch all tasks
router.get('/summary', authMiddleware, taskController.getTaskSummary); // Task summary
router.post('/', authMiddleware, taskController.addTask); // Add a task
router.put('/:taskId', authMiddleware, taskController.editTask); // Edit task
router.delete('/', authMiddleware, taskController.deleteTasks); // Delete tasks
router.get('/sorted', authMiddleware, taskController.getSortedAndFilteredTasks);

module.exports = router;
