import { Task } from "../models/taskModel.js"
import mongoose from "mongoose"


export const createTask = async (req, res) => {
    const { task, date, time } = req.body;

    // 1. Fixed Validation Logic
    // We check if any of these are missing or just empty whitespace.
    if (!task.trim() || !date.trim() || !time.trim()) {
        return res.status(400).json({
            message: 'All fields (task, date, and time) are required.'
        });
    }
         console.log('Validation passed, proceeding to create task...');
    try {
        // 2. Creation
        // Ensure req.user exists (populated by your auth middleware)
        
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        if (!req.user.id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        console.log('validated the task owner')
        const newTask = await Task.create({
            task,
            date,
            time,
            user: req.user.id || req.user
        });
        console.log(newTask)
        // 3. Success Response
        res.status(201).json({
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        console.error("Task Creation Error:", error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};



export const getTasks = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // 1. Fetch tasks
        const tasks = await Task.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate('user', 'username');

        // 2. Safe Username Extraction
        // Check if tasks exist AND if the first task successfully populated the user object
        let displayUsername = "User";
        
        if (tasks && tasks.length > 0 && tasks[0].user) {
            displayUsername = tasks[0].user.username;
        } 

        // 3. Always return a 200, even if data is an empty array []
        res.status(200).json({
            message: tasks.length > 0 ? 'Tasks fetched successfully' : 'No tasks found',
            data: tasks, // This will be [] if no tasks exist, which is what React expects
            username: displayUsername
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};









export const updateTask = async(req, res) =>{
    const {id} = req.params
    const {task, date, time, completed} = req.body
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, {task, date, time, completed}, {new: true})
        res.status(200).json({
            message:'Task updated successfully',
            data: updatedTask
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal server error'
        })
    }
}


export const deleteTask = async(req, res) =>{
    const {id} = req.params

  
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            message:'Task deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal server error'
        })
    }
}