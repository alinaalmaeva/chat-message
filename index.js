var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);
app.get('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html');
});

users = []; //массив со всеми пользователями
connections = []; //массив со всеми подключениями

io.sockets.on('connection', function(socket) {
    console.log("Соединение");
    connections.push(socket);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключение");
    });

    socket.on('send mess', function(data){
        io.sockets.emit('new mess', {mess: data.mess, name: data.name});

    });

});