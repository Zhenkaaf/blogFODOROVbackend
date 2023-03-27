const mongoose = require('mongoose');

/* const userSchema = new mongoose.Schema({ */
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userPhoto: {
        type: String,
        default: '',
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

/* module.exports = mongoose.model('User', UserSchema); */
module.exports = User;