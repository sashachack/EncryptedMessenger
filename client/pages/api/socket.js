import { Server } from 'socket.io'
import { createServer } from "http";

let users = []

export const SocketHandler = (req, res) => {
//     console.log(res.socket.server)
//   if (res.socket.server.io) {
//     console.log('Socket is already running')

//   } else {
//     console.log('Socket is initializing')
//     const io = new Server(res.socket.server)
//     res.socket.server.io = io
//     io.on('connection', socket => {
//         socket.broadcast.emit('a user connected')
//         socket.on('user_email', email => {
//             console.log(email)
//             users.push(email)
//           })
//     })
//   }
//   res.end()
    const httpServer = createServer();
    const io = new Server(httpServer, {
        cors:{
            origin: 'http://localhost:3000'
        }
    });
    
    io.on("connection", socket => {
        socket.broadcast.emit('a user connected')
    });
    
    httpServer.listen(3000);
}