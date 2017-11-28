const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const {PORT, DATABASE_URL} = require("./config");
const Fridge = require("./models");

const app = express();

mongoose.Promise = global.Promise;

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/fridges", (req, res) => {
  Fridge.find(function(err, fridges) {
    if (err) return console.error(err);
    res.send(fridges);
    console.log(fridges);
  });
});

app.get("/fridges/:id", (req, res) => {
  Fridge
    .findById(req.params.id)
    .then(fridge => res.json(fridge))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error"});
    });
});

let server;

function runServer(databaseURL=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseURL, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Listening on port ${port}.`);
        resolve();
      })
      .on("error", err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}