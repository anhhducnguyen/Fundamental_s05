const db = require('../config/database');
const fs = require('fs');

class Comment {
    static async createComment(productId, content) {
        try {
            return await db('comments')
            .insert({
                product_id: productId,
                content
            });
        } catch (error) {
            console.error("Error inserting comment", error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            return await db('comments')
            .where('id', id)
            .first();
        } catch (error) {
            console.log('Error while finding comment', error); 
            throw error;
        }
    }

    static async updateComment(id, content) {
        try {
            return await db('comments')
            .where('id', id)
            .update({
                content
            });
        } catch (error) {
            console.error("Error updating comment", error);
            throw error;
        }
    }

    static async deleteComment(id) {
        try {
            return await db('comments')
            .where('id', id)
            .delete();
        } catch (error) {
            console.error("Error deleting comment", error);
            throw error;
        }
    }

    static async findCommentById(id) {
        try {
            return await db('comments')
            .where('id', id)
            .first();
        } catch (error) {
            console.log('Error while finding comment', error);
            throw error;
        }
    }
}

module.exports = Comment;