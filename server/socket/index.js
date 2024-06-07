const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { getUserDetailsFromToken } = require("../utils/funcHelper");

const app = express();

/*Socket connection */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: process.env.URL_CLIENT,
    methods: ["POST", "PUT", "GET", "DELETE"],
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
  socket.join(user?._id);
  onlineUser.add(user?._id);

  io.emit("onlineUser", Array.from(onlineUser));

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("Disconnect user", socket.id);
  });
});

module.exports = { app, server };
