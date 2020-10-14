const express = require("express");
const app = express();
const mongose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

//Middleware
app.use(express.json());

app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Max-Age', 3600 ); // 1 hour
  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const authRoute = require("./auth");

app.use("/api/user", authRoute);

app.listen(9001, () => console.log("Server is up!"));
