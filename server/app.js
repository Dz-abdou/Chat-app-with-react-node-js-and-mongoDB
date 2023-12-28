require('express-async-errors');
require('dotenv').config()

const express = require('express');
const http = require('http');
const connectDB = require('./db/connect');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

const app = express();
const { Server } = require('socket.io');
const { get } = require('./routes/userRoutes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const server = http.createServer(app);

// const { addUser, getUser, deleteUser, getUsers } = require('./users');

const users = []
const roomLastThreeMessages = []

const addUser = (username, room) => {
    const existingUser = users.find(user => user.username.trim().toLowerCase() === username.trim().toLowerCase());
    if(existingUser) {
        throw Error('user already exists');
    }
    const user = {username, room };
    users.push(user);
    return { user };
}

const deleteUser = (username) => {
    const index = users.findIndex((user) => user.username === username);
    if (index !== -1) return users.splice(index, 1)[0];
}

const getUsers = (room) => users.filter(user => user.room === room);


app.use('/', userRouter);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {    

    console.log('new user');


    socket.on("join-room", ({username, room}, callback) => {
        // const { user } = addUser(username, room);
        addUser(username, room);
        // users.push({username, room});
        socket.join(room);
        console.log(username,' logged in too room ', room);
        let connectedUsersList = getUsers(room);
        io.in(room).emit('update-connected-users-list', connectedUsersList);
        callback();
    });

    socket.on('sendMessage', ({username,message}, callback) => {
        // const user = getUser(username)

        var result = users.find(user => user.username === username);
        io.in(result.room).emit('message', { user: username, text: message });
        callback();
    });

    socket.on("disconnect", () => {
        console.log('user disconnected');
    });

    socket.on('leave-room', ({username}) => {
        console.log(username, 'left');
        var result = users.find(user => user.username === username);
        if(result){
            let connectedUsersList = getUsers(result.room);
            if(connectedUsersList)
                io.in(result.room).emit('update-connected-users-list', connectedUsersList);    
            deleteUser(username);
        }
    });
});

const mongoUri = process.env.MONGO_URI
const port = process.env.PORT

const start = async () =>  {
    await connectDB(mongoUri);
    server.listen(port, () => {
        console.log('serve running on port 1234');
    });
}

start();

