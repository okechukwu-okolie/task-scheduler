import { Task } from "../models/taskModel"




export const createTask =async (req, res) =>{
    const {task, date, time} = req.body

    if(!task.trim() ||  !date.trim()  || !time || time.trim()){
        return res.status(400).json({
            message:'Task is required'
        })
    }

    try {
        const newTask = await Task.create({
            task,
            date,
            time,
            user: req.user.id
        })
        // await newTask.save() // not needed since create already saves the document to the database
        res.status(201).json({
            message:'Task created successfully',
            data: newTask
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal server error'
        })
    }
}