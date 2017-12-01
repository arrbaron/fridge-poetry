require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const {PORT, DATABASE_URL} = require("./config");

const app = express();

app.use(express.static("public"));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/auth/', authRouter);
mongoose.connect(DATABASE_URL);

app.listen(PORT, () => {
  console.log("server started");
});