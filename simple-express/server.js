const express = require("express");
const moment = require("moment");
const connection = require("./utils/db");
let current = moment().format("YYYYMMDD");
let app = express();

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

app.get("/stock", async function (req, res) {
    let result = await connection.queryAsync("SELECT * FROM stock");
    // render("檔案指向",{將資料給到view})
    res.render("stock/list", {
        stocks: result,
    });
});

app.get("/stock/:stockCode", async function (req, res) {
    let result = await connection.queryAsync(
        "SELECT * FROM stock_price where stock_id = ? order by date",
        req.params.stockCode
    );
    res.render("stock/detail", {
        details: result,
    });
});

app.listen(3000, async function () {
    await connection.connectAsync();
    console.log("3000 port running");
});
