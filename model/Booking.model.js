const mongoose = require('mongoose');

const Schema = mongoose.Schema({
        user : String,
        flight : String
      
})

const BookingModel=mongoose.model('Booking',Schema);

module.exports={BookingModel}