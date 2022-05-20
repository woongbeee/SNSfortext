import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import nunjucks from 'nunjucks'
import connection from './models/db.js'
import { router } from './routes/page.js'


dotenv.config();
const __dirname = path.resolve();
const server = express();
const DB = connection();


server.set('view engine', 'html');
nunjucks.configure('views', {
    express: server,
    watch:true
})

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const { PORT } = process.env;
server.set('port', process.env.PORT || '8001');

const pageRouter = router;
server.use('/', pageRouter);


server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));