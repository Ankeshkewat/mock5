const express=require('express');

const app=express();
const {Connection}=require('./config/db')

const {UserRouter}=require('./route/user.route')
const {FlightRouter}=require('./route/flight.route')
const {BookingRouter}=require('./route/booking.route')

const {UserMiddleware}=require('./middleware/user.middleare')
const {LoginMiddleware}=require('./middleware/user.middleare')
const {Flightmiddleware}=require('./middleware/flight.middleware')
const {validate}=require('./middleware/validate.middleware')

app.use(express.json())

app.post('/api/register',UserMiddleware,UserRouter)
app.post('/api/login',LoginMiddleware,UserRouter)
app.post('/api/flights',validate,Flightmiddleware, FlightRouter)
app.get('/api/flights',validate, FlightRouter)
app.get('/api/flights/:id',validate, FlightRouter)
app.patch('/api/flights/:id',validate, FlightRouter)
app.delete('/api/flights/:id',validate, FlightRouter)
app.post('/api/booking',validate, BookingRouter)
app.get('/api/dashboard',validate, BookingRouter)


app.listen(8080,async()=>{
  try{
  await Connection
  console.log('Connected to the database')
  }
  catch(err){
    console.log(err)
  }
})