let url="https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210523&stockNo=2610";




const axios= require('axios');

axios.get(url,{
    params:{
        ID: 12345
    }
}).then(function(response){
    // console.log(response);
    // console.log(response.data);
    console.log(response.data.title);
    console.log(response.data.data);

}).catch(function(error){
    console.log(error);
})
