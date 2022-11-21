
var express = require('express');
var app = express();
var http =require('http').Server(app)
var io = require('socket.io')(http);


//reference
//https://socket.io/docs/v3/emitting-events/


function getRandStr(n){
    let all="`1234567890-=qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERYIOP{}|ASDFGHJKL:\"ZXCVBNM<>?"
    str=""
    for(i=0; i<n; i++){
    str+=all.charAt(Math.floor(Math.random()*all.length))    
    }
    return str
        
}




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


//fisrt index is always the room number
//second index is the id


let numberOfRooms=2

let id=[]//id of players
let passwd=[]//passwords that give you player ids, second index is password
let player=[]//player info
let ghost=[]
for(i=0; i<numberOfRooms; i++){
    id[i]=0
    passwd[i]=[]
    player[i]=[]    
    ghost[i]=[]
}

//player
/*
{
x:0, 
y:0, 
direction=-1,
score=0,
}
*/
//ghost
/*
{
x:0, 
y:0, 
}
*/



io.on("connection", function(socket){
console.log("Player joined")
    //var id1=id
    

    
    socket.on('get_room_amount',function(){
        io.emit('get_room_amount',numberOfRooms);
    });

    socket.on('give_passwd',function(room){
        //make the password and idff
        let password=getRandStr(20);
        passwd[room][password]=id;
        id[room]++;
        
        io.emit('give_passwd', password);//give the password to the client
    });
    
    
    
    
    
    for(let j=0; j<2; j++){
        //id[j]++
        
    //player positions
        socket.on('player_position'+j,function(x, y, direction){
        io.emit('player_position'+j, id[j], x, y, direction)  
        })
    //player scores
        socket.on('score'+j,function(score){
        io.emit('score'+j,id[j],score)  
        })
        
    //player colors
        socket.on('color'+j,function(color){
        io.emit('color'+j,id[j], color)  
        })
    //ghost positions
        socket.on('ghost_position'+j,function(x, y){
        io.emit('ghost_position'+j,id[j], x, y)  
        })
        
        }


    

    socket.on("joined_room", (room) => {
        console.log("Player joined "+room+" room under id "+id[room])
        id[room]++
            
    });
    
    
    
    
    
})







http.listen(3000, function(){
console.log("server started");
});
