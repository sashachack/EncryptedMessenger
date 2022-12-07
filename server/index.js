const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').createServer(app);
const cors = require('cors');
const { SocketAddress } = require('net');
const { isObject } = require('util');

app.use(cors());
app.use(express.json());

// let users = []

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
    socket.on('join', (data) =>{
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

    // MongoClient.connect(uri, async (err, client) => {
    //     const db = client.db("main");
    //     let bodyObject = JSON.parse(req.body);
    //     const body = await db.collection("messages").find({uid: bodyObject.uid}).toArray();


    // })
    
    // socket.on('send_name', (message) => {
    //             // console.log(message.name)
    //             users.push({name: message.name, id: socket.id})
    //             console.log(users)
    //             socket.emit('new_user', {users: users})
    //           })
    // socket.on('remove_user', res =>{
    //           console.log('hello')
    //           console.log(res)
    // })
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

      console.log('🔥: A user disconnected');
      
    });
});

// const { MongoClient } = require("mongodb");

// let uri =
//   'mongodb+srv://nash_user:01j6qjGrnu851R47@cluster0.3lehonp.mongodb.net/?retryWrites=true&w=majority';

// const client = new MongoClient(uri);

// client.connect().then(cli =>{
//     const database = cli.db("main");
//     app.get('/get_all_users', (req, res) =>{
//       const coll = database.collection("users");
//       // console.log(users)
//       const all = coll.find({}).toArray;
//       // await cursor.forEach(doc => console.log(doc));
//       res.send({all: all})

//     })

// })



//     const database = client.db("main");
//     const coll = database.collection("users");
//     // console.log(users)
//     const all = coll.find({});
//     // console.log(all)
//     // await cursor.forEach(doc => console.log(doc));
//     return all
  


// // const all = run().catch(console.dir);

// app.get('/express_backend', (req, res) => { //Line 9
//   const all = run().catch(console.dir);
//   res.send({all: all})
//   // res.send({ users: users }); //Line 10
// });