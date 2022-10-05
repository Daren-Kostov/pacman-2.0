var socket = io();

let map=[
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	
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
		}
	}
}

setTimeout(genFloor, 500);




let room=Math.floor(Math.random()*2)





let block_img=[];

for (i=0;i<3;i++){
	block_img[i]=new Image();
	block_img[i].src="/"+i+".png"
}








let mapSize=0.5;


let score=0;
let myX = 100, myY = 100, direction=0;
let speed=2
var positionsX = []
var positionsY = []
socket.on('position'+room,function (id,x,y){
positionsX[id]=x
positionsY[id]=y
})

function update() {
	
	
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
	
	
	
	
	
	socket.emit('position'+room,myX,myY);    

}
i
draw_block=[]


draw_block[1]= function(x, y){
context.drawImage(block_img[1], x*30, y*30, 30, 30)
}
draw_block[2]= function(x, y){
context.drawImage(block_img[0], x*30, y*30, 30, 30)
context.drawImage(block_img[2], x*30, y*30, 30, 30)
}






function draw() {
	context.clearRect(0,0,1000,1000)
  
	context.scale(mapSize,mapSize)
	//draw the floor texture
	context.drawImage(FLOOR ,0, 0, map.length*30, map[0].length*30)
	
	for(x=0;x<map.length;x++){
		for(y=0;y<map[0].length;y++){
			if(map[x][y]!=0)
				draw_block[map[x][y]](x, y);
				
		}
	}
	
	context.fillStyle="#ffff00"	
	for(var k=0;k<positionsX.length;k+=1){
    context.fillRect(positionsX[k], positionsY[k], 25, 25); 
    }

	context.scale(1/mapSize,1/mapSize)

	context.fillStyle="#00ff00"
	context.fillText("my score: "+ score, 100, 100)
	
	context.fillStyle="#000"
	context.fillText(tps, 400, 100)
	context.fillText(fps, 450, 100)
	context.fillText(room, 500, 100)
	
 }

function keydown(key) {
	console.log("Pressed", key);
	switch(key){
		case 87:
			direction=0;
			break;
		case 68:
			direction=1;
			break;
		case 83:
			direction=2;
			break;
		case 65:
			direction=3;
			break
		case 32:
			direction=-1;
	}
	
	
	
}
