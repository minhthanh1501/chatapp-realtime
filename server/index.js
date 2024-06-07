const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const DBconnect = require("./config/DBconnect");
const initRoutes = require("./routers");
const { app, server } = require("./socket");

// const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.URL_CLIENT,
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 9999;
initRoutes(app);
DBconnect().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running at " + PORT);
  });
});
