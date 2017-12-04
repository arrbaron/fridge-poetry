const express = require("express");
const bodyParser = require("body-parser");
const {Fridge} = require("./models");

const router = express.Router();

router.use(bodyParser.json());

// get all words in the word bank
router.get("/word-bank", (req, res) => {
  
});

// get all fridges - no auth
router.get("/", (req, res) => {
  Fridge.find(function (err, fridges) {
    if (err) return console.error(err);
    console.log(fridges);
  });
});

// save a fridge - auth

module.exports = { router };