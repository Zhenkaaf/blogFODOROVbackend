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



module.exports = router;