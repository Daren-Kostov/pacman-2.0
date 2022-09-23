var app = require('express')();
var http =require('http').Server(app)
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});

app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var id=0
io.on("connection", function(socket){
var id1=id
console.log("Player joined",id)
id+=1
socket.on('position',function(x,y){

io.emit('position',id1,x,y)



        
})
})
http.listen(3000, function(){
console.log("server started");
});
