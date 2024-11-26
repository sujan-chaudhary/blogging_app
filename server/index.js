import express from 'express';

// socket.io for live chatting...
import http from 'http';
import {Server} from 'socket.io'

import dotenv from "dotenv";
import mongoose from 'mongoose'
import adminRoutes from './routes/adminAuth.route.js';
import userRoutes from './routes/user.route.js';
import postsRoutes from './routes/posts.route.js';
import categoriesRoutes from './routes/catergories.route.js'
import uploadRoutes from './routes/upload.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
// socket.io
const server = http.createServer(app);
const io = new Server(server,
  {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], // Allow WebSocket
  }
);

app.use(express.json()); 
app.use(cookieParser()); // it parses incomming cookies from http
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
const port = process.env.PORT || 3001;
const URI = process.env.mongoDBURI;
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("/categories", categoriesRoutes);

// serve static files from upload folder
app.use("/uploads", express.static("server/uploads"));
app.use('/api', uploadRoutes);

// socket.io
io.on("connection", (socket)=>{// handle socket connection
  console.log("A user entered to comment section"); // when app starts this get consoled
  socket.on("sendMsg", async(message)=>{ // listened from client
    console.log("commented: ", message); 

    // storing comment is done !
    // try{
    //   const newComment = await Comment.create({
    //     content: message
    //   })
    // }catch(err){
    //   console.log(err);
    // }

    io.emit("receiveMsg", message); // emit to all clients
  });

  // handle disconnection
  socket.on("disconnect", ()=>{
    console.log("user disconnected from comments"); // get consoled when app/website closed
  });

  // connection error
  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });
  socket.on("reconnect", (attemptNumber) => {
    console.log(`User reconnected after ${attemptNumber} attempts`);
  });
})


mongoose.connect(URI).then(()=>{
            console.log("connected to moongodb")
        }).catch(()=>{
            console.log("error")
})
server.listen(port, ()=>{ // server.listen means I have connected socket.io with my express
    console.log(`listening to port ${port}`);
})