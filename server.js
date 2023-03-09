const express = require('express');
const app = express();
const {getPosts, addPost} = require('./controllers/post-controller');
const mongoose = require('mongoose');

const db = 'mongodb+srv://zhenkaaf:reactBlog@cluster0.xoutytn.mongodb.net/?retryWrites=true&w=majority';
const PORT = 8000;

const bodyParser = require('body-parser');


mongoose
    .connect(db, {})
    .then((res) => console.log('connected to db'))
    .catch((error) => console.log('error db'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); */
app.use(express.urlencoded({ extended: false }));




app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/newpost', function (req, res) {
    res.send('GET newpost page opened');
});

app.get('/posts', getPosts);

app.post('/newpost', addPost);



app.use((req, res) => {
    res.send('error');
});

app.listen(PORT, (error) => {
    error ? console.log('listen***', error) : console.log(`listening port ${PORT}`);
});