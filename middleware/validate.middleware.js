
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const validate=(req,res,next)=>{
    try{
      const token=req.headers?.authorization.split(' ')[1]
      if(!token) return  res.status(401).json({'msg':"Not authorized to do this please login"})
      next()
    }
    catch(err){
        res.status(401).json({'msg':"Something went wrong check the details your are loged in or not"})
    }
}

module.exports={validate}