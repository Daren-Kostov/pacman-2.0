
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


function callupdate(){

    update()
    setTimeout(callupdate, 10)

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


let numberOfRooms=10

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



i=0;

allMaps=[]

allMaps[i++]=[
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1,2,1],
  [1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1],
  [1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],
  [1,2,1,2,1,2,2,2,3,3,3,3,3,2,2,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,3,3,3,3,3,2,1,2,1,2,1,2,1],
  [1,2,1,2,2,2,1,2,3,3,3,3,3,2,1,2,2,2,1,2,1],
  [1,2,1,2,1,2,2,2,3,3,3,3,3,2,2,2,1,2,1,2,1],
  [1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,2,1],
  [1,2,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1],
  [1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],
  [1,2,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  //3 is the box in the middle
  // map array 21 to 21
] 


allMaps[i++]=[ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,1],[1,2,1,2,2,2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,1],[1,2,2,2,1,2,2,2,1,2,1,2,1,2,2,2,1,2,2,2,1],[1,1,2,1,1,2,1,2,2,2,1,2,2,2,1,2,1,1,2,1,1],[1,2,2,2,2,2,1,2,1,2,2,2,1,2,1,2,2,2,2,2,1],[1,1,1,2,1,1,1,2,1,2,1,2,1,2,1,1,1,2,1,1,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,2,1,1,2,1,2,1,2,1,2,1,1,2,1,1,2,1],[1,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,1],[1,2,1,1,1,2,1,1,1,3,3,3,1,1,1,2,1,1,1,2,1],[1,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,1],[1,2,1,1,2,1,1,2,1,2,1,2,1,2,1,1,2,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],[1,1,1,2,1,1,1,2,1,2,1,2,1,2,1,1,1,2,1,1,1],[1,2,2,2,2,2,1,2,1,2,2,2,1,2,1,2,2,2,2,2,1],[1,1,2,1,1,2,1,2,2,2,1,2,2,2,1,2,1,1,2,1,1],[1,2,2,2,1,2,2,2,1,2,1,2,1,2,2,2,1,2,2,2,1],[1,2,1,2,2,2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,1],[1,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

allMaps[i++]=[ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1],[1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1],[1,2,2,2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,2,2,1],[1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,1,2,2,2,1,1,2,1,1,1,2,1,1,2,2,2,1,2,1],[1,2,1,2,1,2,1,2,2,2,1,2,2,2,1,2,1,2,1,2,1],[1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,1,2,1,2,1,2,2,3,3,3,2,2,1,2,1,2,1,2,1],[1,2,1,2,1,2,1,1,2,3,3,3,2,1,1,2,1,2,1,2,1],[1,2,1,2,1,2,1,2,2,3,3,3,2,2,1,2,1,2,1,2,1],[1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,1,2,1,2,1,2,2,2,1,2,2,2,1,2,1,2,1,2,1],[1,2,1,2,2,2,1,1,2,1,1,1,2,1,1,2,2,2,1,2,1],[1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,2,2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,2,2,1],[1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1],[1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

allMaps[i++]=[ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],[1,2,1,1,1,2,1,1,1,1,1,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,1,2,1,1,2,1,2,1,1,1,1,2,1],[1,2,1,2,1,2,2,1,2,1,1,1,1,2,1],[1,2,2,2,2,2,3,3,3,2,2,2,2,2,1],[1,1,1,1,1,1,3,3,3,1,1,1,1,1,1],[1,2,2,2,2,2,3,3,3,2,2,2,2,2,1],[1,2,1,1,1,1,2,1,2,2,1,2,1,2,1],[1,2,1,1,1,1,2,1,2,1,1,2,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,1,1,1,1,2,1,1,1,1,2,1],[1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]




let map=[]

for(i=0; i<numberOfRooms; i++)
    map[i]=allMaps[Math.floor(Math.random()*allMaps.length)] 





let dirDef=[
	{x:0, y:-1},
	{x:1, y:0},
	{x:0, y:1},
	{x:-1, y:0}
]


function areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
	if (Bx <= Ax + Awidth) {
		if (Ax <= Bx + Bwidth) {
			if (By <= Ay + Aheight) {
				if (Ay <= By + Bheight) {
					return 1;
				}
			}
		}
	}
	return 0;
}

speed=2
function update(){
    
    //loop through all rooms
    for(r=0; r<numberOfRooms; r++){
        //loop through all players
        for(p=0; p<player[r].length; p++){
        
            //move the given player in the durection they are headed
            switch(player[r][p].direction){
            		case 0:
            			player[r][p].y-=speed;
            			break;
            		case 1:
            			player[r][p].x+=speed;
            			break;
            		case 2:
            			player[r][p].y+=speed;
            			break
            		case 3:
            			player[r][p].x-=speed;
            }
            
            //check for collisions on the map
            for(x=0;x<map[r].length;x++){
                for(y=0;y<map[r][0].length;y++){
                    if(areColliding(x*30, y*30, 30, 30, player[r][p].x, player[r][p].y, 25, 25)){
                				//if collision with wall
                        switch(map[r][x][y]){
                  					case 1:
                  						player[r][p].direction=-3
                  						player[r][p].x+= -(x*30-player[r][p].x)/4
                  						player[r][p].y+= -(y*30-player[r][p].y)/4
                  						break;
                  					//if collision with circle
                  					case 2:
                  						player[r][p].score++
                  						map[r][x][y]=0
                  				}

                    }
    
                
                    
                }
            }
                    
         
                    
                    
        }
    }
    
    
    
    
    

}





callupdate()



io.on("connection", function(socket){
console.log("Player joined")
    //var id1=id
    

    //client requests the amount of rooms
    socket.on('get_room_amount',function(){
        io.emit('get_room_amount',numberOfRooms);
    });

    //client requests a password
    socket.on('give_passwd',function(room){
        //make the password
        let password=getRandStr(20);
        passwd[room][password]=id[room];
        
        //make player        
        player[room][passwd[room][password]]={
        x:100, 
        y:100, 
        direction:-1,
        score:0,
        color:"hsl("+(Math.random()*360)+", 100%, 50%)",
        }        
        
        
        id[room]++;
        io.emit('give_passwd', password);//give the password to the client
    });
    
    //client requests all player info of a given room
    socket.on('get_players', function(room){
        io.emit('get_players', player[room])
        //console.log(player[room])
    })
    
    //client requests the map of a given room
    socket.on('get_map', function(room){
        io.emit('get_map', map[room])
    
    })
    //client sets player dirrection (with password)
    socket.on('set_direction', function(room, password, direction){
        player[room][passwd[room][password]].direction=direction
        
    
    })
    
    
    
    
    
    
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
