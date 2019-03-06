'use strict';
const http = require('http');


http.createServer(function server_listener(req, res) {
  req.on('data', function data_stream() {})
  req.on('end', function end_of_request_payload() {
    var choose_handler = req.url === '/hello' ? routes.hello : routes.not_found;
    console.log('Handler chooose')
    choose_handler(function handler_callback(status, data) {
      status = (typeof status) === 'number' ? status : 400;
      data = (typeof data) === 'object' ? data : {
        html: `Something is wrong with your html text`
      };
      res.write(data.html);
      res.end();
    })
  })
}).listen(3000);

const handlers = {
  hello: function hello_handler(callback) {
    callback(200, {
      html: `
    <div style="background-color:rgb(100,100,255); width: 100%; height: 100%;">
      <h1 style="color:white; padding: 400px; text-align: center; font-family: verdana, sans-serif; font-size=120%;">Welcome to my first assignment!</h1>
    </div>
    `
    })
  },
  not_found: function not_found_handler(callback) {
    callback(400, {
      html: `
  <div style="background-color:rgb(255,100,100); width: 100%; height: 100%;">
    <h1 style="color:white; padding: 400px; text-align: center; font-family: verdana, sans-serif; font-size=120%;">This route doesn't exist :(</h1>
  </div>
  `
    })
  }
}

const routes = {
  hello: handlers.hello,
  not_found: handlers.not_found
}