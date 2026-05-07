import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, toggleTaskCompletion } from '../controllers/TaskController.js';
import { protect } from '../middleware/userMiddleware.js';

const router = express.Router();

router.post('/createTask',protect, createTask);
router.get('/getTasks', protect, getTasks);
router.put('/updateTask/:id', protect, updateTask);
router.delete('/deleteTask/:id', protect, deleteTask);
router.put('/toggleTaskCompletion/:id', protect, toggleTaskCompletion);

export default router;