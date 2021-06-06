const http = require("http");
const { resolve } = require("path");
const server = http.createServer(function (request, response) {
  console.log("收到連線請求");
  console.log(request.url);

  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain; charset= UTF-8");

  switch (request.url) {
    case "/":
      response.end("Welcome to Index");
      break;
    case "/test":
      response.end("Welcome to test page");
      break;
    case "/aboutus":
      response.end("About our company");
      break;
    default:
      response.writeHead(404);
      response.end("Not Found");
  }
});

server.listen(3000, function () {
  console.log("開啟連線，port:3000");
});
