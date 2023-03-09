const Post = require('./../models/postSchema');


const getPosts = (req, res) => {
    Post
    .find()
    .then((posts) => res.send(posts))
    .catch((error) => {
        console.log(error);
    })
};
const addPost = (req, res) => {
    const { title, author, text } = req.body;
    console.log(`Title: ${title}, Author: ${author}, Text: ${text}`);
    const post = new Post({ title, author, text });
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
        });
};


module.exports = {
    getPosts,
    addPost,
};