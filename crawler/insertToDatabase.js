// 環境配置
const fs = require("fs/promises");
const bluebird = require("bluebird");
const axios = require("axios");
const mysql = require("mysql");
require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection = bluebird.promisifyAll(connection);

// SQL指令
(async function () {
  try {
    await connection.connectAsync();
    let fsRead = await fs.readFile("stock.txt", "utf-8");

    //  透過api分出股票代號及公司名稱
    let axiosCatch = await axios.get(
      `https://www.twse.com.tw/zh/api/codeQuery?query=${fsRead}`
    );
    // 將api的請求結果轉換為可搜尋之關鍵字
    let axiosResult = axiosCatch.data.suggestions;
    let axiosSplit = axiosResult
      .map(function (item) {
        return item.split("\t");
      })
      .find(function (item) {
        return item[0] === fsRead;
      });
    console.log(axiosSplit);

    // 判斷股票代碼存在與否
    if (axiosSplit != undefined) {
      //   console.log("defined");
      // 判斷資料庫內是否已經存在
      let result = await connection.queryAsync(
        `SELECT * FROM stock where stock_id=${axiosSplit[0]} and stock_name='${axiosSplit[1]}'`
      );
      // 若尚未建立，新增置資料庫
      if (result.length == 0) {
        console.log("資料庫內無此筆資料，即將鍵入。");
        await connection.queryAsync(
          `INSERT INTO stock (stock_id, stock_name) VALUES ('${axiosSplit[0]}','${axiosSplit[1]}')`
        );
        console.log("資料建立成功。");
      } else {
        // 若已經建立，離開程式
        console.log("此筆資料已存在");
      }
    } else {
      console.log("查無此資料，無法建立，離開程式");
    }
    return;
  } catch (err) {
    throw err;
  } finally {
    connection.end();
  }
})();
