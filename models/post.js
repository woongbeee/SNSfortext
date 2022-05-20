import mongoose from 'mongoose'


const { Schema } = mongoose;


const postSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        timestamps: true
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    }

})

export const Post = mongoose.model('Post', postSchema);