var jsonServer = require('json-server');
var faker = require('faker');
var path = require('path');
var server = jsonServer.create();
var db = require(path.join(__dirname, 'db.js'));
var router = jsonServer.router(db);
var fs = require('fs');
var middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/breeze/User/Metadata', function (req, res, next) {
    var metadata = require(path.join(__dirname, '../src/entities/user/metadata.ts'));
    res.jsonp(metadata);
})

server.use(router)

server.listen(3000, function () {
    console.log('JSON Server is running')
})
