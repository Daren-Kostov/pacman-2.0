
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

    
    for(let i=0; i<3; i++){
    app.get('/'+i+'.png', function(req, res){
        res.sendFile(__dirname + "/sprites/"+i+".png");
    });
    }

app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var id=0
io.on("connection", function(socket){
var id1 =id
console.log("Player joined",id)
id+=1
    for(let j=0; j<10; j++){
        socket.on('position'+j,function(x,y){
        io.emit('position'+j,id1,x,y)  
        })
    }
})
http.listen(3000, function(){
console.log("server started");
});
