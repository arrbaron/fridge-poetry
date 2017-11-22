const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", () => {
    console.log("GET request to /");
});

app.listen(process.env.PORT || 8080);

exports.app = app;