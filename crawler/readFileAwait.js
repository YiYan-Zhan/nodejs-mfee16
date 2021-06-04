// let url =
//   "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210523&stockNo=2610";

let url2 = "https://www.twse.com.tw/exchangeReport/STOCK_DAY";

const axios = require("axios");
const moment = require("moment");
let current = moment().format("YYYYMMDD");

// console.log(current);

// return;
const fs = require("fs");
// fs.readFile("stock.txt", "utf-8", function (error, data) {
//   if (error == true) {
//     return console.error(error);
//   } else {
//     console.log(data);
//   }
// });

function readFilePromise() {
  return new Promise(function (resolve, reject) {
    fs.readFile("stock.txt", "utf-8", function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

(async function () {
  let readFileAwait = await readFilePromise();
  console.log(`Await: ${readFileAwait}`);
  axios({
    method: "GET",
    url: url2,
    params: {
      date: current,
      stockNo: readFileAwait,
    },
  })
    .then(function (result) {
      console.log(result.data.title);
      console.log(result.data.data);
    })
    .catch(function (error) {
      console.error(error);
    });
})();
