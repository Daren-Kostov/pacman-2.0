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
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	
]



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
socket.on('position',function (id,x,y){
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
	
	
	
	
	
	socket.emit('position',myX,myY);    

}
i
draw_block=[]

draw_block[0]= function(x, y){
context.drawImage(block_img[0], x*30, y*30, 30, 30)
}

draw_block[1]= function(x, y){
context.drawImage(block_img[1], x*30, y*30, 30, 30)
}
draw_block[2]= function(x, y){
context.drawImage(block_img[0], x*30, y*30, 30, 30)
context.drawImage(block_img[2], x*30, y*30, 30, 30)
}
function draw() {
	context.clearRect(0,0,1000,1000)
  
		//	context.drawImage(test, 0, 0, 300, 300)
	context.scale(mapSize,mapSize)
		  
	for(x=0;x<map.length;x++){
		for(y=0;y<map[0].length;y++){
					
			//context.drawImage(block_img[0], x*30, y*30, 30, 30)
			//context.drawImage(block_img[map[x][y]], x*30, y*30, 30, 30)
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
	
 }

function keydown(key) {
	// Show the pressed keycode in the console
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
	}
	
	
	
}
