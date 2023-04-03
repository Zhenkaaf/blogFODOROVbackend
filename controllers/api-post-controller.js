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

const getPersonalPosts = (req, res) => {
    const userEmail = req.params.email;
    console.log('userEmail***', userEmail);
    Post
    .find({email: userEmail})
    .sort({createdAt: -1})
    .then((posts) => res.status(200).json(posts))
    .catch((error) => handleError(res, error));
};


const addPost = (req, res) => {
    const { title, author, text, email } = req.body;
    console.log(`Title: ${title}, Author: ${author}, Text: ${text}, Email: ${email}`);
    const post = new Post({ title, author, text, email });
    post
        .save()
        .then((post) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'POST');
            res.status(200).json(post);
        })
        .catch((error) => handleError(res, error));
};
const delPost = (req, res) => {
    console.log(req.params);
    Post
    .findByIdAndDelete(req.params.id)
    .then(result => {
        res.sendStatus(200);
    })
    .catch((error) => handleError(res, error));
}

const getEditPostPage = (req, res) => {
    console.log('eddddddddddddddddddddddddddddddddddddddddddddddddit');
    Post
    .findById(req.params.id)
    .then((post) => res.status(200).json(post)) // status() устанавливает код состояния HTTP, но не отправляет ответ клиенту.. .json() используется для отправки JSON в ответ на запрос клиента и устанавливает соответствующий заголовок Content-Type в application/json
    .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
    console.log('UPDATE');
    const { title, author, text } = req.body;
    const {id} = req.params;
    Post
    .findByIdAndUpdate(id, { title, author, text })
    .then(result => {
        res.sendStatus(200); //отправляет ответ клиенту с пустым телом сообщения
    })
    .catch((error) => handleError(res, error));
};


module.exports = {
    getPosts,
    addPost,
    delPost,
    getEditPostPage,
    editPost,
    getPersonalPosts
};