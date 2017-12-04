const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Fridge} = require("./models");

const router = express.Router();

router.use(bodyParser.json());

// get all fridges - no auth
router.get("/", (req, res) => {
  // Fridge.find(function (err, fridges) {
  //   if (err) return console.error(err);
  //   console.log(fridges);
  // });
  console.log("get all fridges");
  res.send("get all fridges");
});

const jwtAuth = passport.authenticate("jwt", {session: false});

// save a fridge - auth
router.post("/", jwtAuth, (req, res) => {
  console.log("saving fridge");
  console.log(req.body.poem);
  console.log(req.body.wordBank);
  return Fridge.create({
    wordBank: req.body.wordBank,
    poem: req.body.poem,
    authors: "everyone"
  });
});

module.exports = { router };