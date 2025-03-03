const db = require('../config/database');

class User {    
    static getAll() {
        return db('users');
    }
}

module.exports = User;