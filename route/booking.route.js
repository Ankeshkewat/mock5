const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const BookingRouter = express.Router();
const { BookingModel } = require('../model/Booking.model')

BookingRouter.post('/api/booking', async (req, res) => {
    try {
      const token=req.headers?.authorization.split(' ')[1]
       const {id:user}=jwt.decode(token)
        const flight = req.query.flightId;
        if (!user || !flight) return res.status(500).json({ 'msg': "Please provide flighId as query parameter in url" })
        const data = new BookingModel({ user, flight })
        data.save();
        res.status(201).json({ 'msg': "Flight booked successfully" })


    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }

})
BookingRouter.get('/api/dashboard', async (req, res) => {
    try {
     const data=await BookingModel.find();
     res.status(200).json({ 'msg': data })

    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }

})


module.exports = { BookingRouter }