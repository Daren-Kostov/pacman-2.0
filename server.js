
var express = require('express');
var app = express();
var http =require('http').Server(app)
var io = require('socket.io')(http);









app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});


//load sprites
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
console.log("Player joined")
    
    for(let j=0; j<10; j++){
    //player positions
        socket.on('player_position'+j,function(x,y){
        io.emit('player_position'+j,id,x,y)  
        })
    //player scores
        socket.on('score'+j,function(score){
        io.emit('score'+j,id,score)  
        })
        
    //player colors
        socket.on('color'+j,function(color){
        io.emit('color'+j,id, color)  
        })
    }
    
id++
    
    
    
    
//when a player disconnects
socket.on('disconnect', function () {

    console.log("Player disconnected")    
    
})
    
    
})





http.listen(3000, function(){
console.log("server started");
});
