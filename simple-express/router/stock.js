const connection = require("../utils/db");
const express = require("express");

const router = express.Router();

router.get("/", async function (req, res) {
    let result = await connection.queryAsync("SELECT * FROM stock");
    // render("檔案指向",{將資料給到view})
    res.render("stock/list", {
        stocks: result,
    });
});

router.get("/:stockCode", async function (req, res) {
    let result = await connection.queryAsync(
        "SELECT * FROM stock_price where stock_id = ? order by date",
        req.params.stockCode
    );
    res.render("stock/detail", {
        details: result,
    });
});

module.exports = router;
