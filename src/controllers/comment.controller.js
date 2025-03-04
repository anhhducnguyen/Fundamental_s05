const Product = require('../models/product.model');
const Comment = require('../models/comment.model');

exports.getAllComments = async (req, res) => {

}

exports.getCommentById = async (req, res) => {
    try {
        const id = req.params.id;

        const comment = await Comment.findCommentById(id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({
            message: 'Get comment successfully',
            data: comment
        });
    } catch (error) {
        console.log('Error getting comment', error);
        res.status(500).json({ message: 'Error getting comment', error });        
    }
}

exports.createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const productId = req.params.id;

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Comment.createComment(productId, content);

        res.status(201).json({ 
            message: 'Create successfully' 
        });
    } catch (error) {
        console.log("Error creating comment", error);
        res.status(500).json({ message: 'Error creating comment', error: error  });
    }    
}

exports.updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const { content } = req.body;

        const existingComment = await Comment.findById(id);

        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await Comment.updateComment(id, content);

        res.json({ message: 'Update successfully' });
    } catch (error) {
        console.log('Error updating comment', error);
        res.status(404).json({ message: 'Error updating comment', error });        
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
    
        const exitstingComment = await Comment.findById(id);

        if (!exitstingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        await Comment.deleteComment(id);

        res.json({ message: 'Delete successfully' });
    } catch (error) {
        console.log('Error deleting comment', error);
        res.status(404).json({ message: 'Error deleting comment', error });  
    }    
}