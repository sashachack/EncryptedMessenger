const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').createServer(app);
const cors = require('cors');
const { SocketAddress } = require('net');
const { isObject } = require('util');


app.use(cors());
app.use(express.json());


http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const uri = 'mongodb+srv://nash_user:01j6qjGrnu851R47@cluster0.3lehonp.mongodb.net/?retryWrites=true&w=majority';

let uk = (i, j) => {
    let N = 2;
    if (i < j)
        return i * N + j;
    else
        return j * N + i;
}

socketIO.on('connection', (socket) => {
    const id = socket.id
        // let username;
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('join', (data) => {
        console.log(data)
        let room = uk(data.uid, data.ouid)

        console.log('someone joined room ' + room)
        socket.join(room)

    })
    socket.on('send_message', (data) => {
        data = data.data
        console.log('socket received: ' + data)
        console.log(data)
        let room = uk(data.uid, data.ouid)
        console.log('send message to room: ' + room)
        data = {
            text: data.message,
            fromMe: false
        }
        socket.broadcast.to(room).emit('receive_message', data)

    })

    socket.on('disconnect', () => {
        // console.log(id)
        // let index = 0
        // for (let i = 0; i < users.length; i++){
        //     if(users[i].id == id){
        //       index = i
        //     }
        // }
        // console.log(index)
        // users.splice(index, 1);
        // socket.removeAllListeners("send_message");
        // socketIO.removeAllListeners("connection");
        console.log('🔥: A user disconnected');

    });
});



const mongoose = require('mongoose');
mongodb = require('mongodb');
require("dotenv").config();

app.listen(5001, () => console.log(`Server running on port: ${5001}`));

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs")

//set up mongoose 
mongoose.connect(
    process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    });

//set up routes (middleware) once you make a post request to users
app.use("/users", require("./api/userRoutes"));