import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './user.js';
import { Post } from './post.js';

mongoose.Promise = global.Promise;

dotenv.config();
const { MONGO_URI } = process.env;

export default function connection() {
    const connect = () => {
        mongoose
            .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Successfully connected to mongodb'))
            .catch(e => console.error(e));
    }
    connect();

    mongoose.connection.on('error', (error) => {
        console.log(`몽고 디비 연결 실패 : ${error}`)
    });

    mongoose.connection.on('disconnected', () => {
        console.log(`몽고 디비 연결이 끊어졌습니다 . `);
        connect();
    });
}