const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserRouter = express.Router();
const { UserModel } = require('../model/User.model')

UserRouter.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        bcrypt.hash(password, 10, async (err, hashPassword) => {
            if (err) return res.status(500).json({ 'msg': "Something went wrong" })
            let NewUser = new UserModel({ name, email, password: hashPassword });
            await NewUser.save();
            res.status(201).json({ "msg": "Account created succesfully" })
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})

UserRouter.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let { _id, password: hash_pass } = await UserModel.findOne({ email });
        bcrypt.compare(password, hash_pass, async (err, resolve) => {
            if (err) return res.status(401).json({ 'msg': "Wrong password" })
            const token = jwt.sign({ id: _id, email }, process.env.secret)
            res.status(201).json({ "msg": "Login succesfull", 'token': token })
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})


module.exports = { UserRouter }