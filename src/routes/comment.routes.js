const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.get('/', (req, res) => {
    res.json({
        message: 'all'
    })
})

router.get('/:id', commentController.getCommentById);
router.post('/:id', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;