const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please provide a username']

    },
    email: {
        type:String,
        required: [true,'Please Provide an email'],
        unique: true
    },
    password: {
        type:String,
        required: [true, 'Please enter a valid password']
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User',UserSchema)
module.exports = User