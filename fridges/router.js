const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Fridge} = require("./models");

const router = express.Router();

router.use(bodyParser.json());

// get all fridges - no auth
router.get("/", (req, res) => {
  Fridge.find(function (err, fridges) {
    if (err) return console.error(err);
    res.json(fridges);
  });
  console.log("get all fridges");
});

const jwtAuth = passport.authenticate("jwt", {session: false});

// add a fridge - auth
router.post("/", jwtAuth, (req, res) => {
  console.log("adding fridge");
  return Fridge.create({
    wordBank: req.body.wordBank,
    poem: req.body.poem,
    authors: "everyone"
  });

  // TODO - pass along username into an array of authors when they SAVE it
});

// update a fridge - auth
router.put("/:id", jwtAuth, (req, res) => {
  console.log(req.body);
  Fridge.findById(req.body.id, function (err, fridge) {
    if (err) return console.error(err);
    fridge.poem = req.body.poem;
    fridge.wordBank = req.body.wordBank;
    fridge.save(function(err, updatedFridge) {
      if (err) return console.error(err);
      res.send(updatedFridge);
    });
  });
});

// delete a fridge - auth

module.exports = { router };