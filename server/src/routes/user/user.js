const express = require('express');
const { registerUser, fetchUser, userDelete } = require('../../controllers/controllers');



const userRoutes = express.Router();

userRoutes.post('/register_user', registerUser);
userRoutes.get('/read_user', fetchUser);
userRoutes.delete('/delete_user/:_id', userDelete);

module.exports = userRoutes;