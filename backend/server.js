//import statements
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import entryRoute from './routes/UserRoutes.js'
// import { connectDB } from './Database/db.js'
import mongoose from 'mongoose'

dotenv.config()

//defining the server and port 
const app = express()
const Port = process.env.Port
const dbKey = process.env.mongodb_uri

//middleware
app.use(express.json())
app.use(cors())



//routes
app.get('/app',entryRoute)



//mongoose
// connectDB(dbKey)

const connectDB = async(connectionKey)=>{
await mongoose.connect(connectionKey)
console.log('Database connected successfully')
} 
connectDB(dbKey)

app.listen(Port, ()=>{
    console.log('server is running on port:', Port)
})