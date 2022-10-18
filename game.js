var socket = io();

let map=[
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




let room=Math.floor(Math.random()*2)




//block textures
let block_img=[];
for (i=0;i<4;i++){
	block_img[i]=new Image();
	block_img[i].src="/"+i+".png"
}


let mainMenu=true




//map size
let mapSize=0.5;

//our score, coords, and speed, and color
let myscore=0, mycolor="hsl("+(Math.random()*360)+", 100%, 50%)";
console.log(mycolor)
let myX = 100, myY = 100, direction=0;
let speed=2

let myGhostX=312, myGhostY=300, myGhostDirection=Math.floor(Math.random()*4);



let colors=[];
let scores=[];
let playerPositionsX=[];
let playerPositionsY=[];





let ghostPositionsX=[];
let ghostPositionsY=[];



function update() {
	if(!mainMenu){
	
	for(x=0;x<map.length;x++){
		for(y=0;y<map[0].length;y++){
			if(areColliding(x*30, y*30, 30, 30, myX, myY, 25, 25)){
				//if collision with wall
				switch(map[x][y]){
					case 1:
						direction=-1
						myX+= -(x*30-myX)/10
						myY+= -(y*30-myY)/10
						break;
					//if collision with circle
					case 2:
						myscore++
						map[x][y]=0
						genFloor()
				}
			}	
			if(areColliding(x*30, y*30, 30, 30, myGhostX, myGhostY, 25, 25)){
				if(map[x][y]==1){
						myGhostX+= -(x*30-myGhostX)/10;
						myGhostY+= -(y*30-myGhostY)/10;

						myGhostDirection=Math.floor(Math.random()*4);
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

		
	switch(myGhostDirection){
		case 0:
			myGhostY-=speed;
			break;
		case 1:
			myGhostX+=speed;
			break;
		case 2:
			myGhostY+=speed;
			break
		case 3:
			myGhostX-=speed;
	}
	
		
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
		
		
		
		
		
				
				
				
				
	//update our position and score with the server
	socket.emit('player_position'+room,myX,myY);    
	socket.emit('score'+room, myscore);    
	socket.emit('color'+room, mycolor);    
	
	socket.emit('ghost_position'+room, myGhostX,myGhostY);
	
	}
}


draw_block=[]






function draw() {
	context.clearRect(0,0,1000,1000)
  //when in main menu
	if(mainMenu){
		for(let j=0; j<10; j++){
			context.fillStyle="#0f0"
			context.fillRect(j*50+80, 70, 49, 49)
			
			context.fillStyle="#000"
			context.fillText(j, 50*j+100, 100)
		
		}
	//when not in main menu
	}else{
	
	
	
		context.scale(mapSize,mapSize)
		
		
		
		//draw the floor texture
		context.drawImage(FLOOR ,0, 0, map.length*30, map[0].length*30)
	
				
		//draws the players	and ghost
		context.lineWidth = 5
		for(var k=0;k<playerPositionsX.length;k+=1){
			context.fillStyle=colors[k]	
	    context.fillRect(playerPositionsX[k], playerPositionsY[k], 25, 25); 
			context.strokeStyle=colors[k]
			context.strokeRect(ghostPositionsX[k], ghostPositionsY[k], 25, 25); 
			
	    }
		context.lineWidth = 1
		context.scale(1/mapSize,1/mapSize)

		//draws background for the scores 
		context.fillStyle="#000"
		context.fillRect(390, 80, 110, 500)
		
		//draws scores
		for(var k=0;k<scores.length;k+=1){
			context.fillStyle=colors[k]	
			context.fillText("my score: "+ scores[k], 400, 100+25*k)
		}
		
		
		context.fillStyle="#000"
		context.fillText(tps, 400, 50)
		context.fillText(fps, 450, 50)
		context.fillText(room, 500, 50)
	
	}
}
function keydown(key) {
	console.log("Pressed", key);
	switch(key){
		case 87:
			direction=0;
			myY--;
			break;
		case 68:
			direction=1;
			myX++;
			break;
		case 83:
			direction=2;
			myY++;
			break;
		case 65:
			direction=3;
			myX--;
			break
		case 32:
			direction=-1;
	}	
}

function pointerup(){
	console.log(mouseX)
	console.log(mouseY)
	if(mainMenu){
		for(let j=0; j<10; j++){
			if(areColliding(mouseX, mouseY, 1, 1, j*50+80, 70, 49, 49)){
				mainMenu=false
				room=j
				//player position
				socket.on('player_position'+room,function (id,x,y){
				playerPositionsX[id]=x
				playerPositionsY[id]=y
				})
				//color
				socket.on('score'+room,function (id,score){
				scores[id]=score
				})
				//color
				socket.on('color'+room,function (id,color){
				colors[id]=color
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
