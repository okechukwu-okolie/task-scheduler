//import statements
import dns from 'node:dns';// this line and the other line of code were added to eliminate the error related
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import entryRoute from './routes/UserRoutes.js'
import mongoose from 'mongoose'
import router from './routes/TaskRoutes.js'

dotenv.config()
dns.setServers(['8.8.8.8', '1.1.1.1']);//to lack of connection to the database


//defining the server and port 
const app = express()
const Port = process.env.Port
const dbKey = process.env.mongodb_uri

//middleware
app.use(express.json())
app.use(cors())



//routes
app.use('/api', entryRoute)
app.use('/api', router)



mongoose.connect(dbKey)
.then(()=>{
    console.log('Database connected successfully')
})
.catch((error)=>{
    console.log('Database connection failed', error)
})

app.listen(Port, ()=>{
    console.log('server is running on port:', Port)
})