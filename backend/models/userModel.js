import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true
    }
},
{
    timestamps: true
})


export const User = mongoose.model('User', userSchema)