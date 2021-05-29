let url="https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210523&stockNo=2610";

let url2="https://www.twse.com.tw/exchangeReport/STOCK_DAY";


const axios= require('axios');

// Method 1: full url, no needs any params content
axios.get(url).then(function(response){
    // console.log(response);
    // console.log(response.data);
    console.log(response.data.title);
    console.log(response.data.data);

}).catch(function(error){
    console.log(error);
})

// Method 2: simple url, controled by params content 
axios.get(url2,{
    params:{
        response: "json",
        date: "20210523",
        stockNo: "2610"
    }
}).then(function(response){
    console.log(response.data.title);
    console.log(response.data.data);
});