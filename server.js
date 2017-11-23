const express = require("express");
const syllable = require("syllable");
const app = express();

app.use(express.static("public"));

app.get("/", () => {
    console.log("GET request to /");
    // res.send(syllable("hello world"));
    res.send("hello squirrel");
});

app.listen(process.env.PORT || 8080);

exports.app = app;