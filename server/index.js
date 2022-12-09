const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').createServer(app);
const cors = require('cors');

let users = []

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('send_message', message => {
                    console.log(message)
                    
              })
    socket.on('send_name', (message) => {
                // console.log(message.name)
                users.push({name: message.name, id: socket.id})
                console.log(users)
              })
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

// app.get('/express_backend', (req, res) => { //Line 9
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
// });

const mongoose = require('mongoose');
mongodb = require('mongodb');
require("dotenv").config();

app.listen(5001, () => console.log(`Server running on port: ${5001}`));

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs")

//set up mongoose 
mongoose.connect(
  process.env.MONGODB_URI, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, 
(err) => {
  if (err) throw err;
  console.log("MongoDB connection established");
});

//set up routes (middleware) once you make a post request to users
app.use("/users", require("./api/userRoutes"));