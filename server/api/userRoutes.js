const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("../models/userModel");
const auth = require("../middleware/auth");

require('dotenv').config();

// sign up new user
router.post("/signup", async (req, res) => {
  try{
    let {first, last, username, email, password} = req.body;
    console.log(username)
    if(!first || !last || !username ||!email || !password){
      return res.status(400).json({msg: "Not all fields have been entered."});
    }

    const user = await User.findOne({username : username});

    const uid = await User.find({}).countDocuments() + 1;
    console.log(uid)

    if(user != null) {
      return res.status(400).json({msg: "This username is already taken. Please select a different one!"});
    }

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      first,
      last,
      username,
      email,
      password: passHash,
      id: uid
    });
    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err){
    console.log(err)
    res.status(500).json({error: err.message});
  }
});

//login existing user
router.post("/login", async (req, res) => {
  try{
    const {username, password} = req.body;
    if(!username || !password){
      return res.status(400).json({msg: "Not all fields have been entered."});
    }
    const user = await User.findOne({username : username});
    if(!user){
      return res.status(400).json({msg: "No account with this username has been registered."});
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
      return res.status(400).json({msg: "Incorrect password."});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        friends: user.friends,
        blocked: user.blocked,
        id: user.id
      }
    })
  } catch(err){
    res.status(500).json({error: err.message});
  }
});

// get friends of logged in user
router.post("/get_friends", async (req, res) => {
  try{
    const {username} = req.body
    const user = await User.findOne({username : username});
    res.json(user.friends)

  } catch(err){
    res.status(500).json({error: err.message});
  }
})

router.post("/all_users", async (req, res) => {
  try{
    const {first, last} = req.body
    User.find({}, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  } catch(err) {
    res.status(500).json({error: err.message});
  }
})

router.post("/find_user", async (req, res) => {
  try{
    const {selectedUserID} = req.body
    console.log(selectedUserID)
    User.find({_id: selectedUserID}, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        console.log(found)
        res.json(found);
      }
    });
  } catch(err) {
    res.status(500).json({error: err.message});
  }
})

router.post("/get_friends", async (req, res) => {
  try{
    const {username} = req.body
    User.find({username: username}, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        console.log(found.friends)
        res.json(found);
      }
    });
  } catch(err) {
    res.status(500).json({error: err.message});
  }
})

router.post("/add_friend", async (req, res) => {
  try{
    console.log("IN ADD FRIEND")
    const {friend_username, id, username} = req.body
    console.log(friend_username)

    const filter = { username: username };
    const update = { $push: { friends : {username: friend_username} } };
    console.log(update)

    const user = await User.findOne({username : username});

    let new_user = await User.updateOne(
      { _id: user._id },
      update
   )

   const final_user = await User.findOne({username : username});
   res.json(final_user)

  } catch(err) {
    console.log(err.message)
    res.status(500).json({error: err.message});
  }
})

module.exports = router;