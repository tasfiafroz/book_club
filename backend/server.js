// // require('dotenv').config();

// // const express = require('express')
// // const mongoose = require('mongoose')
// // const toolsRoutes = require('./routes/tools')
// // const userRoutes = require('./routes/user')
// // const statusRoutes = require('./routes/status')
// // const productRoutes = require('./routes/product')
// // const eventRoutes = require("./routes/event")
// // const plantRoutes = require("./routes/plantRoutes")
// // const { loginUser } = require('./controllers/userController')

// // //for image upload
// // const multer = require('multer');
// // const path = require('path');
// // const cors = require("cors")

// // //express app
// // const app = express()

// // //middleware
// // app.use(express.json())
// // app.use(cors())

// // app.use((req, res, next) => {
// //     console.log(req.path, req.method)
// //     next()
// // })

// // //routes
// // app.use('/api/tools', toolsRoutes) 
// // app.use('/api/user', userRoutes)
// // app.use('/api/status',statusRoutes)
// // app.use('/api/products',productRoutes)
// // app.use("/api/events", eventRoutes)
// // app.use("/api/plants", plantRoutes)

// // //connect to DB
// // mongoose.connect(process.env.MONGO_URI)
// //     .then(() => {
// //         //listen for request
// //         app.listen(process.env.PORT, () =>{
// //         console.log('connected to DB and listening on port ',process.env.PORT)
// //         })
// //     })
// //     .catch((error) => {
// //         console.log(error)
// //     })



// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require("cors");
// const mailgun = require("mailgun-js");

// const toolsRoutes = require('./routes/tools');
// const userRoutes = require('./routes/user');
// const statusRoutes = require('./routes/status');
// const productRoutes = require('./routes/product');
// const eventRoutes = require("./routes/event");
// const plantRoutes = require("./routes/plantRoutes");
// const chatRoutes = require("./routes/chat");
// const consultantRoute = require('./routes/consultant')
// const appointmentRoutes = require('./routes/appointmentRoutes')
// const Chat = require("./models/chatModel");
// const User = require("./models/userModel");

// // Express app
// const app = express();
// const server = http.createServer(app); // Create HTTP server

// // Socket.io setup
// const io = new Server(server, {
//     cors: {
//         origin: process.env.FRONTEND_URL || "http://localhost:3000", // Adjust frontend URL
//         methods: ["GET", "POST"]
//     }
// });

// // Initialize Mailgun with correct API key and domain
// const mg = mailgun({
//     apiKey: process.env.MAILGUN_API_KEY, 
//     domain: process.env.MAILGUN_DOMAIN
//   });

// // Middleware
// app.use(express.json());
// app.use(cors());


// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// });

// // Routes
// app.use('/api/tools', toolsRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/status', statusRoutes);
// app.use('/api/products', productRoutes);
// app.use("/api/events", eventRoutes);
// app.use("/api/plants", plantRoutes);
// app.use("/api/chat", chatRoutes); // Chat routes
// app.use("/api/consultants",consultantRoute);
// app.use("/api/appointments", appointmentRoutes);


// //chat codes start


// // Middleware to parse JSON
// app.use(express.json());

// // Message schema and model
// const messageSchema = new mongoose.Schema({
//     text: String,
//     sender: String,
//     room: String,   // Add room to associate messages with a room
//     timestamp: { type: Date, default: Date.now },
// });
// const Message = mongoose.model('Message', messageSchema);

// // API Routes to get and post messages
// app.post('/api/messages', async (req, res) => {
//     const newMessage = new Message(req.body);
//     await newMessage.save();
//     res.status(201).send(newMessage);
// });

// // app.get('/api/messages/:room', async (req, res) => {
// //     const messages = await Message.find({ room: req.params.room }).sort({ timestamp: -1 });
// //     res.status(200).json(messages);
// // });

// // API Route to get messages by room
// app.get('/api/messages/:room', async (req, res) => {
//     try {
//         const messages = await Message.find({ room: req.params.room }).sort({ timestamp: 1 }); // Sort by timestamp (oldest first)
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ error: 'Error retrieving messages' });
//     }
// });


// // Setting up Socket.io for users and rooms
// let users = {};  // Object to store user data by socket ID

// io.on('connection', (socket) => {
//     console.log('A user connected', socket.id);

//     // User joins a room
//     socket.on('joinRoom', (data) => {
//         const { username, room } = data;
//         users[socket.id] = { username, room };  // Store user info
//         socket.join(room);  // Join the specific room
//         console.log(`${username} joined room ${room}`);
//     });

//     // Listen for message from client
//     socket.on('message', async (data) => {
//         const { message, room } = data;
//         const newMessage = new Message({
//             text: message,
//             sender: users[socket.id]?.username || 'Unknown',
//             room,
//         });
//         await newMessage.save();

//         // Emit the message to the room
//         io.to(room).emit('message', {
//             sender: users[socket.id]?.username || 'Unknown',
//             message,
//         });
//     });

//     // Disconnect user and leave room
//     socket.on('disconnect', () => {
//         const user = users[socket.id];
//         if (user) {
//             console.log(`${user.username} disconnected from room ${user.room}`);
//             socket.leave(user.room);  // Remove user from the room
//             delete users[socket.id];   // Clean up user data
//         }
//     });
// });


// //chat codes end

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         server.listen(process.env.PORT, () => { // Use `server.listen` instead of `app.listen`
//             console.log('Connected to DB and listening on port', process.env.PORT);
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     });

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const toolsRoutes = require('./routes/tools');
const userRoutes = require('./routes/user');
const statusRoutes = require('./routes/status');
const productRoutes = require('./routes/product');
const eventRoutes = require('./routes/event');
const plantRoutes = require('./routes/plantRoutes');
const chatRoutes = require('./routes/chat');
const consultantRoute = require('./routes/consultant');
const appointmentRoutes = require('./routes/appointmentRoutes');
const Chat = require('./models/chatModel');
const User = require('./models/userModel');

// Express app
const app = express();
const server = http.createServer(app); // Create HTTP server

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Adjust frontend URL
        methods: ['GET', 'POST'],
    },
});


// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/tools', toolsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/products', productRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/chat', chatRoutes); // Chat routes
app.use('/api/consultants', consultantRoute);
app.use('/api/appointments', appointmentRoutes);

// Chat functionality
// Message schema and model
const messageSchema = new mongoose.Schema({
    text: String,
    sender: String,
    room: String, // Add room to associate messages with a room
    timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);

// API Routes to get and post messages
app.post('/api/messages', async (req, res) => {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).send(newMessage);
});

// API Route to get messages by room
app.get('/api/messages/:room', async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.room }).sort({ timestamp: 1 }); // Sort by timestamp (oldest first)
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving messages' });
    }
});

// Setting up Socket.io for users and rooms
let users = {}; // Object to store user data by socket ID

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // User joins a room
    socket.on('joinRoom', (data) => {
        const { username, room } = data;
        users[socket.id] = { username, room }; // Store user info
        socket.join(room); // Join the specific room
        console.log(`${username} joined room ${room}`);
    });

    // Listen for message from client
    socket.on('message', async (data) => {
        const { message, room } = data;
        const newMessage = new Message({
            text: message,
            sender: users[socket.id]?.username || 'Unknown',
            room,
        });
        await newMessage.save();

        // Emit the message to the room
        io.to(room).emit('message', {
            sender: users[socket.id]?.username || 'Unknown',
            text: message,
        });
    });

    // Disconnect user and leave room
    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            console.log(`${user.username} disconnected from room ${user.room}`);
            socket.leave(user.room); // Remove user from the room
            delete users[socket.id]; // Clean up user data
        }
    });
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(process.env.PORT, () => {
            // Use `server.listen` instead of `app.listen`
            console.log('Connected to DB and listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });