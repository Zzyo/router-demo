var express = require('express');
var path = require('path')
var app = express();
var port = 8088;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/history', function (req, res) {
   res.sendFile(path.resolve(__dirname,  './test/history.html'));
})

app.get('/hash', function (req, res) {
   res.sendFile(path.resolve(__dirname,  './test/hash.html'));
})

app.get('*', function (req, res) {
   res.sendFile(path.resolve(__dirname,  './test/404.html'));
});

var server = app.listen(port, function () {
  console.log('Hash路由测试地址为http://localhost:' + port + '/hash');
  console.log('History路由测试地址为http://localhost:' + port + '/history');
});