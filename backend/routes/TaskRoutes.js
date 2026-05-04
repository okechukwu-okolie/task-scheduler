import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/TaskController.js';

const router = express.Router();

router.post('/createTask', createTask);
router.get('/getTasks', getTasks);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

export default router;