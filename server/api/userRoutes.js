const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("../models/userModel");
const auth = require("../middleware/auth");

require('dotenv').config();

// sign up new user
router.post("/signup", async (req, res) => {
  console.log("IN SIGN UP")
  try{
    let {first, last, username, email, password} = req.body;

    if(!first || !last || !username ||!email || !password){
      return res.status(400).json({msg: "Not all fields have been entered."});
    }

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      first,
      last,
      username,
      email,
      password: passHash
    });
    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err){
    res.status(500).json({error: err.message});
  }
});

//login existing user
router.post("/login", async (req, res) => {
  try{
    console.log("IN LOGIN IN")
    const{username, password} = req.body;
    if(!username || !password){
      return res.status(400).json({msg: "Not all fields have been entered."});
    }
    const user = await User.findOne({username : username});
    if(!user){
      return res.status(400).json({msg: "Not account with this username has been registered."});
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
      return res.status(400).json({msg: "Incorrect password."});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email
      }
    })
  } catch(err){
    res.status(500).json({error: err.message});
  }
});

module.exports = router;