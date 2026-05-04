import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task: {
        type: String,
        required: true
  },
  date: {
    type: String,
    required: false
  },
  time: {
    type: String,
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

export const Task = mongoose.model('Task', taskSchema);