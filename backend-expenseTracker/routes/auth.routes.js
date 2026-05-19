const express = require("express");
const authModel = require("../models/auth.model");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlware/auth.middleware')

authRouter.post("/signup", async (req, res) => {
  try {
    const user = await authModel.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(500)
        .json({ message: "this email is already registered, please login" });
    } else {
      const myPlaintextPassword = req.body.password;
      const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

    await authModel.create({...req.body,password: hash})
      res.status(201).json({message:"signup successfull"})
    }
  } catch (error) {
      res.status(500).json({message:"signup failed"})
    
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const user = await authModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(500)
        .json({ message: "user does not exist, please signup first" });
    } else {
      const myPlaintextPassword = req.body.password;
        const hash = user.password;
      const result = await bcrypt.compare(myPlaintextPassword, hash);

      if(result){
        var token = jwt.sign({ id: user._id, email: user.email}, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRES_IN})
        res.status(200).json({message:"Login sucessfull", token:token })
      }
      else{
        res.status(500).json({message:"Login failed"})
      }

    
    }
  } catch (error) {
      res.status(500).json({message:"error occured", error: error.message})
    
  }
});


authRouter.get('/profile', authMiddleware, async(req, res) => {
    try {
        const user = await authModel.findById(req.user.id).select("-password")
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:"failed to fetch profile", error: error.message})
    }
})


module.exports = authRouter