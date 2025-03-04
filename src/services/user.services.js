const db = require('../config/database');

module.exports.getAllUsers = () => {
    return db('users').select('*');
}

module.exports.getUserById = (id) => {
    return db('users').where('id', id).select('*');
}

module.exports.createUser = (user) => {
    return db('users').insert(user);
}