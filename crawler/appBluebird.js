// let url =
//   "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210523&stockNo=2610";

let url2 = "https://www.twse.com.tw/exchangeReport/STOCK_DAY";

const axios = require("axios");
const moment = require("moment");
const Promise = require("bluebird");

console.log(Promise);

let current = moment().format("YYYYMMDD");

// console.log(current);

// return;
const fs = require("fs");

// function readFilePromise() {
//   return new Promise(function (resolve, reject) {
//     fs.readFile("stock.txt", "utf-8", function (error, data) {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }
const readFileBluebird = Promise.promisify(fs.readFile);
readFileBluebird("stock.txt", "utf-8").then(function (result) {
  console.log(result);
  axios({
    method: "GET",
    url: url2,
    params: {
      date: current,
      stockNo: result,
    },
  })
    .then(function (response) {
      // console.log(response);
      console.log(response.data.title);
      console.log(response.data.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});
