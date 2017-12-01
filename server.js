require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const secureRoutes = express.Router();

// controllers
const dataController = require("./data-controller");
const authenticateController = require("./authenticate-controller");

const {PORT, DATABASE_URL, JWT_SECRET} = require("./config");

app.use(bodyParser.json());
app.use("/secure-api", secureRoutes);

mongoose.connect(DATABASE_URL);

app.get("/fridges", dataController.getData);

// validation middleware
secureRoutes.use(function(req, res, next) {
  const token = req.body.token || req.headers.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(500).send("invalid token");
      }
      else {
        next();
      }
    });
  }
  else {
    res.send("please send a token");
  }
});

secureRoutes.post("/fridges", dataController.postData);

app.get("/authenticate", authenticateController.authenticate);

app.listen(PORT, () => {
  console.log("server started");
});