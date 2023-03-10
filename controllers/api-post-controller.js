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
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};


module.exports = {
    getPosts,
    addPost,
};