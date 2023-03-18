const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const FlightRouter = express.Router();
const { FlightModel } = require('../model/Flight.model')

//post
FlightRouter.post('/api/flights', async (req, res) => {
    try {
        let newdata = new FlightModel(req.body);
        await newdata.save()
        res.status(201).json({ 'msg': "Flight added successfully" })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})

//get
FlightRouter.get('/api/flights', async (req, res) => {
    try {
        let newdata = await FlightModel.find()
        res.status(201).json({ 'msg': newdata })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})
//get by objectid
FlightRouter.get('/api/flights/:id', async (req, res) => {
    try {
        const id = req.params.id
        let newdata = await FlightModel.findOne({ _id: id })
        res.status(201).json({ 'msg': newdata })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})

//update by its id
FlightRouter.patch('/api/flights/:id', async (req, res) => {
    try {
        let update = req.body;
        const id = req.params.id
        await FlightModel.findByIdAndUpdate({_id:id},update)
        res.status(204).json({ 'msg': 'Flight details updated successfully' })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})
//delete by its id
FlightRouter.delete('/api/flights/:id', async (req, res) => {
    try {
        const id = req.params.id
        await FlightModel.findByIdAndDelete({_id:id})
        res.status(202).json({ 'msg': 'Flight details deleted from the database successfully' })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})



module.exports = { FlightRouter }