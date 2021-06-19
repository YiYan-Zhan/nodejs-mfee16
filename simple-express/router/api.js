const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/stock", async function (req, res) {
    let queryResult = await connection.queryAsync("SELECT * FROM stock");
    res.json(queryResult);
});

module.exports = router;
