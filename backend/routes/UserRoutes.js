import express from 'express'
import { userSignIn, userSignUp } from '../controllers/UserController.js'

const entryRoute = express.Router()

entryRoute.post('/signUp', userSignUp)
entryRoute.post('/signIn', userSignIn)



export default entryRoute