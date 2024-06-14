const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { getUserDetailsFromToken } = require("../utils/funcHelper");
const UserModel = require("../models/UserModel");

const app = express();

/*Socket connection */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: process.env.URL_CLIENT,
  },
});

//online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("Connect user", socket.id);

  const token = socket.handshake.auth.token;

  // get current
  const user = await getUserDetailsFromToken(token);
  // create a room
  socket.join(user._id.toString());
  onlineUser.add(user._id.toString());
  
  io.emit("onlineUser", Array.from(onlineUser));

  socket.on('message-page',async (userID)=>{
    console.log('userID',userID)
    const userDetails = await UserModel.findById(userID).select("-password")
    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile_pic: userDetails?.profile_pic,
      online: onlineUser.has(userID)
    }

    socket.emit("message-user",payload)
  })

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("Disconnect user", socket.id);
  });
});

module.exports = { app, server };
