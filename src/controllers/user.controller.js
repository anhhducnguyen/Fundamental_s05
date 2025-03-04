const User = require('../services/user.services');

module.exports.getAllUser = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json({
            message: 'Get all users successfully',
            "data": users
        });
    } catch (error) {
        console.log('Error getting users', error);
        res.json({ error: error.message });
    }
}

module.exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        res.json({
            message: 'Get one user successfully',
            "data": user
        })
    } catch (error) {
        console.log('Error getting user by id', error);
        res.json({ error: error.message });
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        await User.createUser(newUser);

        res.json({
            message: 'Create user successfully',
            "data": newUser
        });
    } catch (error) {
        console.log('Error creating user', error);
        res.json({ error: error.message });
    }
}

module.exports.updateUser = (req, res) => {
    res.json({
        message: 'Update user by id',
    });
}

module.exports.deleteUser = (req, res) => {
    res.json({
        message: 'Delete user by id',
    });
}