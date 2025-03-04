const db = require('../config/database');

class Tag {
    static async getAll() {
        return db('tags');
    }

    static async findTagById(id) { 
        try {
            return db('tags').where('id', id).first();
        } catch (error) {
            console.log('Error finding', error);
            throw error;
        }
    }

    static async createTag(tagName) {
        try {
            return db('tags').insert({ tagName });
        } catch (error) {
            console.log('Error inserting', error);
            throw error;
        }
    }

    static async updateTag(id, tagName) {
        try {
            return db('tags').where({ id }).update({ tagName });
        } catch (error) {
            console.log('Error updating', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            return db('tags').where('id', id).first();
        } catch (error) {
            console.log('Error finding', error);
            throw error;
        }
    }

    static async deleteTag(id) {
        try {
            return db('tags').where('id', id).del();
        } catch (error) {
            console.log('Error deleting', error);
            throw error;
        }
    }
}

module.exports = Tag;