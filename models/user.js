import mongoose from 'mongoose'


const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
})

export const User = mongoose.model('User', userSchema);