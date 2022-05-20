import express from 'express';
import { User } from '../models/user.js'
import { Post } from '../models/post.js'
import bcrypt from 'bcrypt'



export const router = express.Router();

router.get('/', (req, res,title) => {
    res.render('Login', { title:'Thoghts became words,',title1:'words became actions.'})
    
})


router.get('/signin', (req,res) => {
    res.render('Signin')
})

router.post('/signin', async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (username && password && confirmPassword) {
        const hash = await bcrypt.hash(password, 12);
        const user = new User({
            username: username,
            password: hash
        })
        try {
            await user.save();
            return res
                .status(200)
                .render('Login', {title:'Welcome to our member!',title1:'Please log in.'});
        } catch (err) {
            return res.status(500);
        }
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const all = await Post.find({}).sort({ createAt: -1 });

    if (username && password) {
        try {
            const user = await User.findOne({ username: username });
            if (user) {
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    return res.render('main', {user:username, posts:all});
                } else {
                    return res.render('Login', { title: 'Thoghts became words,', title1: 'words became actions.', notice: 'Wrong username or password.' })
                }
            } else {
                return res.render('Login', { title: 'Thoghts became words,', title1: 'words became actions.', notice: 'You are not our member.' })
            }

        } catch (err) {
           res.status(500)
        }
    } else {
        return res.render('Login', { title: 'Thoghts became words,', title1: 'words became actions.',notice:'All fields are required.'})
    }
})

router.post('/post', async (req, res) => {
    const { user, userPost } = req.body;
    const findUser = await User.findOne({ username: user });

    const post = new Post({
        username: findUser.username,
        userId: findUser._id,
        content: userPost
    })

    try {
        await post.save();
        const all = await Post.find({}).sort({createAt: -1 });
        return res.render('main', {
            user: user,
            posts: all,
        });
    } catch (err) {
        throw new Error("try again");
    }
})

router.post('/delete', async (req, res) => {
    const {user, content } = req.body;

   const deleteTarget=await Post.findOneAndDelete({
       username: user,
       content: content,
   });


    const all = await Post.find({}).sort({ createAt: -1 });

    return res.render('main', {
        user: user,
        posts: all,
    });
})