const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;