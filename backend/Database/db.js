import mongoose from "mongoose";



export const connectDB = (connectionKey)=>{
mongoose.connect(connectionKey)
console.log('Database connected successfully')
} 