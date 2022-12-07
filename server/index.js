const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').createServer(app);
const cors = require('cors');

app.use(cors());
app.use(express.json());

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

app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});