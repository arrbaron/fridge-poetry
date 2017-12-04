require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: fridgeRouter } = require("./fridges/router");
const {PORT, DATABASE_URL} = require("./config");

const app = express();

app.use(express.static("public"));
app.use(morgan('common'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/auth/', authRouter);
app.use("/fridges/", fridgeRouter);
mongoose.connect(DATABASE_URL);

app.listen(PORT, () => {
  console.log("server started");
});