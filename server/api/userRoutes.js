const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("../models/userModel");
const Messages = require("../models/messagesModel");
const auth = require("../middleware/auth");

require('dotenv').config();

// sign up new user
router.post("/signup", async(req, res) => {
    try {
        let {
            first,
            last,
            username,
            email,
            hashword,
            puk,
            pik
        } = req.body;
        console.log(username, hashword)
        if (!first || !last || !username || !email || !hashword) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        // console.log('A')
        const user = await User.findOne({ username: username });
        // console.log('B')
        const uid = await User.find({}).countDocuments() + 1;
        // console.log(uid)

        // console.log('C')

        if (user != null) {
            return res.status(400).json({ msg: "This username is already taken. Please select a different one!" });
        }

        console.log('D')

        const newUser = new User({
            first,
            last,
            username,
            email,
            password: hashword,
            id: uid,
            publicKey: puk,
            privateKey: pik
        });
        const savedUser = await newUser.save();

        console.log('E')

        const convos = []
        const newMessages = new Messages({
            uid: uid,
            convos: convos
        })
        console.log('F')

        newMessages.save()

        console.log('G')
        console.log(savedUser)
        res.json(savedUser);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

//login existing user
router.post("/login", async(req, res) => {
    try {
        const { username, hashword } = req.body;
        if (!username || !hashword) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "No account with this username has been registered." });
        }
        const passMatch = (hashword == user.password);
        if (!passMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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
                publicKey: user.publicKey,
                privateKey: user.privateKey,
                id: user.id
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get friends of logged in user
router.post("/get_friends", async(req, res) => {
    try {
        const { username } = req.body
        const user = await User.findOne({ username: username });
        res.json(user.friends)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/all_users", async(req, res) => {
    try {
        const { first, last } = req.body
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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/find_user", async(req, res) => {
    try {
        const { selectedUserID } = req.body
        console.log(selectedUserID)
        User.find({ _id: selectedUserID }, function(error, found) {
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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/get_friends", async(req, res) => {
    try {
        const { username } = req.body
        User.find({ username: username }, function(error, found) {
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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/add_friend", async(req, res) => {
    try {
        console.log("IN ADD FRIEND")
        const { friend_username, uid, ouid, username } = req.body
        console.log(friend_username)

        const filter = { username: username };
        const update = { $push: { friends: { username: friend_username, id: ouid} } };
        // const friend_update = { $push: { friends: { username: username, id: uid } } };
        console.log(update)

        const user = await User.findOne({ username: username });
        // const friend = await User.findOne({ username: friend_username });

        let new_user = await User.updateOne({ _id: user._id },
            update
        )

        // let new_friend = await User.updateOne({ _id: friend._id },
        //     friend_update
        // )

        const final_user = await User.findOne({ username: username });

        const messages = []

        const update_convos = { $push: { convos: { ouid: ouid, messages: messages } } };

        let new_message = await Messages.updateOne({ uid: uid },
            update_convos
        )

        res.json(final_user)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;