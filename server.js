require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// controllers
const dataController = require("./data-controller");

const {PORT, DATABASE_URL} = require("./config");

app.use(bodyParser.json());

mongoose.connect(DATABASE_URL);

const dummyData = [];

app.get("/fridges", dataController.getData);

app.post("/fridges", dataController.postData);

app.listen(PORT, () => {
  console.log("server started");
});