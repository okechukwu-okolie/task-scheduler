import { Task } from "../models/taskModel.js"


export const createTask = async (req, res) => {
    const { task, date, time } = req.body;

    // 1. Fixed Validation Logic
    // We check if any of these are missing or just empty whitespace.
    if (!task?.trim() || !date?.trim() || !time?.trim()) {
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







export const getTasks = async(req, res) =>{
    try {
        const tasks = await Task.find({user: req.user.id}).sort({createdAt: -1})
        res.status(200).json({
            message:'Tasks fetched successfully',
            data: tasks
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal server error'
        })
    }
}







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
        await Task.findByIdAndDelete(id)
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