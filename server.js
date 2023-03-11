const express = require('express');
const app = express();
const {getPosts, addPost} = require('./controllers/api-post-controller');
const apiController = require('./controllers/api-post-controller');
const mongoose = require('mongoose');
const apiRouter = express.Router();
require('dotenv').config();
/* const Post = require('./models/postSchema'); */



const PORT = process.env.PORT || 8001;

/* const bodyParser = require('body-parser'); */

/* mongoose.set('strictQuery', false); */
mongoose
    .connect(process.env.MONGO_URL, {})
    .then((res) => console.log('connected to db'))
    .catch((error) => console.log('error db'));

/* app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); */

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.use(express.json());
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); */
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter); // добавляем префикс '/api' для всех маршрутов



app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/newpost', function (req, res) {
    res.send('GET newpost page opened');
});


//Get All Posts
app.get('/posts', getPosts);
/* apiRouter.get('/posts', getPosts); */

//Add New Post
app.post('/newpost', addPost);
/* apiRouter.post('/newpost', addPost); */




/* app.use((req, res) => {
    res.send('error');
}); */

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});



app.listen(PORT, (error) => {
    error ? console.log('listen***', error) : console.log(`listening port ${PORT}`);
});