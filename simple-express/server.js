const express = require("express");
const current = require("moment");

let app = express();

app.use(express.static("public"));

//
app.set("views", "views");

//告訴express對應位置
app.set("view engine", "pug");

app.use(function (req, res, next) {
    console.log("connected");
    next();
});

// router

app.get("/", function (req, res) {
    // res.send("Hi express");

    // 將首頁指向指定檔案
    res.render("index");
});

app.get("/aboutus", function (req, res) {
    // res.send("About us");

    res.render("aboutUs");
});

app.listen(3000, function () {
    console.log("3000 port running");
});
