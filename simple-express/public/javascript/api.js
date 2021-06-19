(function () {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/api/stock",
        dataType: "json",
    }).done(function (data) {
        console.log(data);
    });
})();

(function () {
    axios.get("/api/stock").then(function (res) {
        console.log(res.data);
    });
})();
