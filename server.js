const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Post = require('./models/postSchema')
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


app.get('/posts', function (req, res) {
    Post
    .find()
    .then((posts) => res.send(posts))
    .catch((error) => {
        console.log(error);
    })
});



app.post('/newpost', function (req, res) {
    const { title, author, text } = req.body;
    console.log(`Title: ${title}, Author: ${author}, Text: ${text}`);
    const post = new Post({ title, author, text });
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            
        })
   /*  res.send(req.body); */

    /*  console.log('body', req.body);
     console.log('method***', req.method); */
});
app.use((req, res) => {
    res.send('error');
});

app.listen(PORT, (error) => {
    error ? console.log('listen***', error) : console.log(`listening port ${PORT}`);
});