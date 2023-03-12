const Post = require('../models/postSchema');

const handleError = (res, error) => {
    res.status(500).send(error);
};

const getPosts = (req, res) => {
    Post
    .find()
    .sort({createdAt: -1})
    .then((posts) => res.status(200).json(posts))
    .catch((error) => handleError(res, error));
};
const addPost = (req, res) => {
    const { title, author, text } = req.body;
    console.log(`Title: ${title}, Author: ${author}, Text: ${text}`);
    const post = new Post({ title, author, text });
    post
        .save()
        .then((post) => {
            res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.set('Access-Control-Allow-Methods', 'POST');
            res.status(200).json(post);
        })
        .catch((error) => handleError(res, error));
};
const delPost =(req, res) => {
    console.log(req.params);
    Post
    .findByIdAndDelete(req.params.id)
    .then(result => {
        res.sendStatus(200);
    })
    .catch((error) => handleError(res, error));
}


module.exports = {
    getPosts,
    addPost,
    delPost
};