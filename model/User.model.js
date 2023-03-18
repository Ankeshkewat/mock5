const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const UserModel=mongoose.model('users',Schema);

module.exports={UserModel}