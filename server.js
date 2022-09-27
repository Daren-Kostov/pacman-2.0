
var express = require('express');
var app = express();
var http =require('http').Server(app)
var io = require('socket.io')(http);









app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});

/*
for(i=0; i<3; i++){
    app.get('/sprites/'+i+'.png', function(req, res){
        res.sendFile(__dirname + "/sprites/"+i+".png");
    });
}
*/
    app.get('/sprites/0.png', function(req, res){
        res.sendFile(__dirname + "/sprites/0.png");
    });
    app.get('/sprites/1.png', function(req, res){
        res.sendFile(__dirname + "/sprites/1.png");
    });
    app.get('/sprites/2.png', function(req, res){
        res.sendFile(__dirname + "/sprites/2.png");
    });


app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var id=0
io.on("connection", function(socket){
var id1 =id
console.log("Player joined",id)
id+=1
socket.on('position',function(x,y){

io.emit('position',id1,x,y)



        
})
})
http.listen(3000, function(){
console.log("server started");
});
