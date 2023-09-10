//подключаем модули к программе
var express = require('express'); // подключение express
var app = express(); // создадим переменную приложения
var server = require('http').createServer(app); //переменная сервера
var io = require('socket.io')(server); //подключение socket.io

server.listen(3000); //отслеживание сервера
//Отслеживание url-адресов, отслеживантся главная страница, поэтому указан "/", в функции передаем два параметра запрос и ответ
app.get('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html'); //отображение index.html
});

users = []; //массив со всеми пользователями
connections = []; //массив со всеми подключениями

//функция срабатывает при подключение к странице
io.sockets.on('connection', function(socket) {
    console.log("Соединение"); //вывод в консоль
    connections.push(socket); //добавление нового соединения в массив connections

//функция срабатывает при отключении от сервера    
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1); //удаления соединения из массива
        console.log("Отключение"); //вывод в консоль
    });

//функция, которая получает сообщения от пользователей    
    socket.on('send mess', function(data){
        //передаем событие new mess, которое будет вызвано у всех подключенных пользователей и выведется новое сообщение
        io.sockets.emit('new mess', {mess: data.mess, name: data.name});

    });

});
