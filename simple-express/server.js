const express = require("express");
const moment = require("moment");
const connection = require("./utils/db");
let current = moment().format("YYYYMMDD");
let app = express();
let stockRouter = require("./router/stock");
let apiRouter = require("./router/api");
app.use("/stock", stockRouter);
app.use("/api", apiRouter);

app.use(express.static("public"));

//
app.set("views", "views");

//告訴express對應位置
app.set("view engine", "pug");

app.use(function (req, res, next) {
    console.log(`connected at ${current}`);
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

app.listen(3000, async function () {
    await connection.connectAsync();
    console.log("3000 port running");
});
