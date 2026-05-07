import mongoose from 'mongoose';
import { Task } from "../models/taskModel.js"


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


// export const updateTask = async(req, res) =>{
//     const {id} = req.params
//     const {task, date, time, completed} = req.body
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(id, {task, date, time, completed}, {new: true})
//         res.status(200).json({
//             message:'Task updated successfully',
//             data: updatedTask
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message:'Internal server error'
//         })
//     }
// }





export const updateTask = async (req, res) => {
    const { id } = req.params;
    // We only pull what is sent in the body of the api call, which could be any subset of the task fields (like just 'completed' for strike-through)
    const updates = req.body; 

    // 1. Safety Check: Is the ID valid?
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Task ID format' });
    }

    try {
        // 2. Use 'updates' to only change the fields provided (like 'completed')
        // { new: true } returns the document AFTER the change is made
        console.log("Received Update Request for Task ID:", id);
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
        console.log("Updated Task:", updatedTask);

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({
            message: 'Task updated successfully',
            data: updatedTask
        });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


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


//i want to create a new controller function called toggleTaskCompletion that will toggle the completed status of a task. I will use this function in the SchedulerPage.jsx file to toggle the completed status of a task when the user clicks on the task. I will also update the getTasks function to return the completed status of each task so that I can display it in the SchedulerPage.jsx file.

export const toggleTaskCompletion = async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Find the task by ID . this is a Gaurd Clause to ensure the task exists before we try to toggle it
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // 2. Toggle the completed status
        task.completed = !task.completed;

        // 3. Save the updated task
        const updatedTask = await task.save();

        res.status(200).json({
            message: 'Task completion status toggled successfully',
            data: updatedTask
        });
    } catch (error) {
        console.error("Toggle Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
