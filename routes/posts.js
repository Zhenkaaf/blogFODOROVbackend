const router = require('express').Router();
const PostSchema = require('../models/postSchema');
const bcrypt = require('bcrypt');

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        console.log('delete work');
        const post = await PostSchema.findByIdAndDelete(req.params.id);
        res.status(200).json('Post has been deleted');
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        console.log('getPostWorkByID');
        const post = await PostSchema.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/email/:email', async (req, res) => {
    try {
        console.log('getPostWorkByEmail');
        console.log('req.params.email***', req.params.email);
        const posts = await PostSchema.find({ email: req.params.email });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/newpost', async (req, res) => {
    try {
        console.log('creating newPost');
        const { title, author, text, email, picture } = req.body;
        console.log(`Title: ${title}, Author: ${author}, Text: ${text}, Email: ${email}, Picture: ${picture}`);
        const newPost = new PostSchema({ title, author, text, email, picture });
        const post = await newPost.save();
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'POST');
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


/* const addPost = (req, res) => {
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
 */

module.exports = router;