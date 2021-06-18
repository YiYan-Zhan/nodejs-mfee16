const express = require("express");
const current = require("moment");

let app = express();

app.use(express.static("public"));

app.use(function (req, res, next) {
    console.log("connected");
    next();
});

// router

app.get("/", function (req, res) {
    res.send("Hi express");
});

app.get("/aboutus", function (req, res) {
    res.send("About us");
});

app.listen(3000, function () {
    console.log("3000 port running");
});
