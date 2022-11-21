var socket = io();




let allMaps=[]
let i=0

//original
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

//map:
allMaps[i++]=[ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,1],[1,2,1,2,2,2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,1],[1,2,2,2,1,2,2,2,1,2,1,2,1,2,2,2,1,2,2,2,1],[1,1,2,1,1,2,1,2,2,2,1,2,2,2,1,2,1,1,2,1,1],[1,2,2,2,2,2,1,2,1,2,2,2,1,2,1,2,2,2,2,2,1],[1,1,1,2,1,1,1,2,1,2,1,2,1,2,1,1,1,2,1,1,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,2,1,1,2,1,2,1,2,1,2,1,1,2,1,1,2,1],[1,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,1],[1,2,1,1,1,2,1,1,1,3,3,3,1,1,1,2,1,1,1,2,1],[1,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,1],[1,2,1,1,2,1,1,2,1,2,1,2,1,2,1,1,2,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],[1,1,1,2,1,1,1,2,1,2,1,2,1,2,1,1,1,2,1,1,1],[1,2,2,2,2,2,1,2,1,2,2,2,1,2,1,2,2,2,2,2,1],[1,1,2,1,1,2,1,2,2,2,1,2,2,2,1,2,1,1,2,1,1],[1,2,2,2,1,2,2,2,1,2,1,2,1,2,2,2,1,2,2,2,1],[1,2,1,2,2,2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,1],[1,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

//map: 
allMaps[i++]=[ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1],[1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1],[1,2,2,2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,2,2,1],[1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,1,2,2,2,1,1,2,1,1,1,2,1,1,2,2,2,1,2,1],[1,2,1,2,1,2,1,2,2,2,1,2,2,2,1,2,1,2,1,2,1],[1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,1,2,1,2,1,2,2,3,3,3,2,2,1,2,1,2,1,2,1],[1,2,1,2,1,2,1,1,2,3,3,3,2,1,1,2,1,2,1,2,1],[1,2,1,2,1,2,1,2,2,3,3,3,2,2,1,2,1,2,1,2,1],[1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,1,2,1,2,1,2,2,2,1,2,2,2,1,2,1,2,1,2,1],[1,2,1,2,2,2,1,1,2,1,1,1,2,1,1,2,2,2,1,2,1],[1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,2,2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,2,2,1],[1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1],[1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

allMaps[i++]=[ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],[1,2,1,1,1,2,1,1,1,1,1,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,1,2,1,1,2,1,2,1,1,1,1,2,1],[1,2,1,2,1,2,2,1,2,1,1,1,1,2,1],[1,2,2,2,2,2,3,3,3,2,2,2,2,2,1],[1,1,1,1,1,1,3,3,3,1,1,1,1,1,1],[1,2,2,2,2,2,3,3,3,2,2,2,2,2,1],[1,2,1,1,1,1,2,1,2,2,1,2,1,2,1],[1,2,1,1,1,1,2,1,2,1,1,2,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,1,1,1,1,2,1,1,1,1,2,1],[1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]



let map=allMaps[Math.floor(Math.random()*allMaps.length)]

//initialize the floor texture
const FLOOR = canvas.cloneNode();
FLOOR.width=map.length*30
FLOOR.height=map[0].length*30
const FLOORcontext = FLOOR.getContext('2d');







//generate the floor texture
function genFloor(){
	for(x=0;x<map.length;x++){
		for(y=0;y<map[0].length;y++){
			FLOORcontext.drawImage(block_img[0], x*30, y*30, 30, 30)
			FLOORcontext.drawImage(block_img[map[x][y]], x*30, y*30, 30, 30)
		}
	}
}

setTimeout(genFloor, 500);



let numberOfRooms=2
let room//=Math.floor(Math.random()*2)




//TEXTURES
let block_img=[];
for (i=0;i<4;i++){
	block_img[i]=new Image();
	block_img[i].src="/"+i+".png";
}




let pacmanIMG= new Image();
pacmanIMG.src="/pacman.png";


let ghostIMG= new Image();
ghostIMG.src="/ghost.png";

let mainMenu=true




//map size
let mapSize=0.5;

//direction to x and y coordinates
let dirDef=[
	{x:0, y:-1},
	{x:1, y:0},
	{x:0, y:1},
	{x:-1, y:0}
]


//our score, coords, and speed, and color
let myscore=0, mycolor="hsl("+(Math.random()*360)+", 100%, 50%)";
console.log(mycolor)
let myX = 100, myY = 100, direction=0;

//ONLY 1, 2, 3, 5, 10, 15, 30
let Gspeed=5;


let speed=5;


let myGhostX=302, myGhostY=302, myGhostDirection=Math.floor(Math.random()*4);
let myGhostXnext=302, myGhostYnext=302
let myPassword=""



let colors=[];
let scores=[];
let playerPositionsX=[];
let playerPositionsY=[];
let playerDirection=[];




let ghostPositionsX=[];
let ghostPositionsY=[];





//get our password
socket.on("give_passwd", function(passwd){
myPassword=passwd
})









function update() {
	if(!mainMenu){
	
		
		
		
		
	switch(direction){
		case 0:
			myY-=speed;
			break;
		case 1:
			myX+=speed;
			break;
		case 2:
			myY+=speed;
			break
		case 3:
			myX-=speed;
	}
		
		
		
	for(x=0;x<map.length;x++){
		for(y=0;y<map[0].length;y++){
			if(areColliding(x*30, y*30, 30, 30, myX, myY, 25, 25)){
				//if collision with wall
				switch(map[x][y]){
					case 1:
						direction=-3
						myX+= -(x*30-myX)/4
						myY+= -(y*30-myY)/4
						break;
					//if collision with circle
					case 2:
						myscore++
						map[x][y]=0
						genFloor()
				}
			}	
				
				
			for(var k=0;k<playerPositionsX.length;k+=1){
				if(areColliding(x*30, y*30, 30, 30, playerPositionsX[k], playerPositionsY[k], 25, 25)){
					//if another player collides with a white circle remove it from our map (the map is client side)
					if(map[x][y]==2){
						map[x][y]=0
						genFloor()	
					}
				}
			}		
		}
	}	
	
		//ghost movement
	if(myGhostX==myGhostXnext && myGhostY==myGhostYnext){
		
		let gX=Math.floor((myGhostX)/30), gY=Math.floor((myGhostY)/30)
			//direction
		let d=Math.floor(Math.random()*4)
			//distance		
		let dis
			
			//if the block in direction is empty proceed
			while(map[gX+dirDef[d].x][gY+dirDef[d].y]==1){ 
				d=Math.floor(Math.random()*4)
			}
			
			
			//if the next block in direction is empty randomy proceed, otherwise break the loop
			for(dis=2;dis<5;dis++){
				//break loop if wall OR random number is something
				if(map[gX+dirDef[d].x*dis][gY+dirDef[d].y*dis]==1 || Math.random()<0.5)
					break
			}
			//give new target for the ghost
			dis--
			myGhostXnext+=dirDef[d].x*30*dis	
			myGhostYnext+=dirDef[d].y*30*dis
	}else{
			
			
		myGhostX+=Math.sign(myGhostXnext-myGhostX)*Gspeed;
		myGhostY+=Math.sign(myGhostYnext-myGhostY)*Gspeed;
	}
	
	//player-ghost collision
		
	for(var k=0;k<playerPositionsX.length;k+=1){
		if(areColliding(ghostPositionsX[k], ghostPositionsY[k], 25, 25, myX, myY, 25, 25)){
		myX=100000
		}
	}	
		
		
		
				
				
				
				
	//update our position and score with the server
	socket.emit('player_position'+room,myX,myY, direction);    
	socket.emit('score'+room, myscore);    
	socket.emit('color'+room, mycolor);    
	
	socket.emit('ghost_position'+room, myGhostX,myGhostY);
	
	}
}


draw_block=[]



context.globalCompositeOperation = "destination-over"
function draw() {
		
	context.clearRect(0,0,1000,1000)
  //when in main menu
	if(mainMenu){
		for(let j=0; j<numberOfRooms; j++){
			context.fillStyle="#000"
			context.fillText(j+1, 60*j+102, 100)
			context.fillStyle="#f00"
			if(j>numberOfRooms/2-1)
			context.fillStyle="#0f0"
			
			context.fillRect(j*60+80, 70, 50, 50)
		
		}
	//when not in main menu
	}else{
	
	
		context.scale(mapSize,mapSize)
		
		
		//draws the players	and ghost
		context.lineWidth = 10
		for(i=0;i<playerPositionsX.length;i++){
				
			context.fillStyle=colors[i]	
			
			
			context.translate(playerPositionsX[i]+25/2, playerPositionsY[i]+25/2);
			context.rotate((playerDirection[i]+3)*Math.PI*0.5);
	    context.drawImage(pacmanIMG,-25/2, -25/2, 25, 25); 
			
			context.rotate(-(playerDirection[i]+3)*Math.PI*0.5);
			
			context.translate(-playerPositionsX[i]-25/2, -playerPositionsY[i]-25/2)
			
			context.drawImage(ghostIMG,ghostPositionsX[i], ghostPositionsY[i], 25, 25); 
			
				
			context.globalAlpha = 0.5
			context.globalCompositeOperation = "source-atop";
			context.fillRect(playerPositionsX[i], playerPositionsY[i], 25, 25); 
			context.fillRect(ghostPositionsX[i], ghostPositionsY[i], 25, 25); 
			context.globalCompositeOperation = "destination-over";

			context.globalAlpha = 1
	    }
		
			context.globalCompositeOperation = "destination-over";
		//draw the floor texture
		context.drawImage(FLOOR ,0, 0, map.length*30, map[0].length*30)
	
				
		context.lineWidth = 1
		context.scale(1/mapSize,1/mapSize)

		//draws background for the scores 
		
		//draws scores
		for(var k=0;k<scores.length;k+=1){
			context.fillStyle=colors[k]	
			context.fillText("my score: "+ scores[k], 400, 100+25*(k+1))
		}
		if(room>numberOfRooms/2-1){//if co-op
			let sumScore=0
			for(var k=0;k<scores.length;k+=1)
				sumScore+=scores[k];
				
			context.fillStyle="#fff"	
			context.fillText("Global score: "+ sumScore, 400, 100)
			
		}
		
		context.fillStyle="#000"
		context.fillRect(390, 80, 110, 500)
		
			context.fillStyle="#000"
		context.fillText(tps, 400, 50)
		context.fillText(fps, 450, 50)
		context.fillText(room, 500, 50)
	
	}
	
	
}
//movement impulses
let mvimp=3
function setDirection(d, i){
	direction=d;
	if(i>0)
		setTimeout(setDirection,100, d, i-1)
}

function keydown(key) {
	console.log("Pressed", key);
	switch(key){
		case 87:
			setDirection(0, mvimp)
			break;
		case 68:
			setDirection(1, mvimp)
			break;
		case 83:
			setDirection(2, mvimp)
			break;
		case 65:
			setDirection(3, mvimp)
			break
		case 32:
			direction=-3;
	}	
}

function pointerup(){
	socket.emit("give_passwd", 1)
	console.log(myPassword)
	console.log(mouseX)
	console.log(mouseY)
	if(mainMenu){
		for(let j=0; j<numberOfRooms; j++){
			if(areColliding(mouseX, mouseY, 1, 1, j*60+80, 70, 50, 50)){
				
				
				
				
				
				mainMenu=false
				room=j

				socket.emit('joined_room', room);
				//player position
				socket.on('player_position'+room,function (id,x,y,dir){
				playerPositionsX[id]=x;
				playerPositionsY[id]=y;
				playerDirection[id]=dir;
				})
				//color
				socket.on('score'+room,function (id,score){
				scores[id]=score;
				})
				//color
				socket.on('color'+room,function (id,color){
				colors[id]=color;
				})
				
				//ghost positions
				socket.on('ghost_position'+room,function (id,x, y){
					ghostPositionsX[id]=x;
					ghostPositionsY[id]=y;
				})
			}
		}
	}

}
