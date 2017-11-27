const express = require("express");
const mongoose = require("mongoose");
const {PORT, DATABASE_URL} = require("./config");
const {Fridge} = require("./models");

const app = express();

mongoose.Promise = global.Promise;

app.use(express.static("public"));

app.get("/", () => {
  console.log("GET request to /");
  
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