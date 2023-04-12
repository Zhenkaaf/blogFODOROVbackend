const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
       /*  unique: true, */
    },
    picture: {
        type: String,
        default: '',
    },
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;