
var express = require('express');
var app = express();
var http =require('http').Server(app)
var io = require('socket.io')(http);


//reference
//https://socket.io/docs/v3/emitting-events/
//https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program




let port=3000;

process.argv.forEach(function (val, index, array) {
    if(index==2)
        port=val;
});




app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});


//load block sprites
for(let i=0; i<4; i++){
    app.get('/'+i+'.png', function(req, res){
        res.sendFile(__dirname + "/sprites/"+i+".png");
    });
}

//load pacman and ghost sprites
app.get('/pacman.png', function(req, res){
    res.sendFile(__dirname + "/sprites/pacman.png");
});
app.get('/ghost.png', function(req, res){
    res.sendFile(__dirname + "/sprites/ghost.png");
});

app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

let id=0

io.on("connection", function(socket){
console.log("Player "+id+" joined at port "+port)
    
      var id1=id;


    //player positions
        socket.on('player_position',function(x, y, direction){
        io.emit('player_position', id1, x, y, direction)  
        })
    //player scores
        socket.on('score',function(score){
        io.emit('score',id1,score)  
        })
        
    //player colors
        socket.on('color',function(color){
        io.emit('color',id1, color)  
        })
    //player vote
        socket.on('vote',function(vote){
        io.emit('vote',id1, vote)  
        })
    //ghost positions
        socket.on('ghost_position',function(x, y){
        io.emit('ghost_position',id1, x, y)  
        })

        id++;
            
})







http.listen(port, function(){
console.log("server started");
});
