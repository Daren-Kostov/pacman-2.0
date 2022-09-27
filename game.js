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
/*
for (i=0;i<3;i++){
	block_img[i]=new Image();
	block_img[i].scr="/"+i+".png"
}
*/
	block_img[0]=new Image();
	block_img[0].onload = function() { console.log("utefqwugioeewgyif"); }

	block_img[0].scr="/0.png"
	block_img[1]=new Image();
	block_img[1].scr="/1.png"
	block_img[2]=new Image();
	block_img[2].scr="/2.png"


let test=new Image()
//test.src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb6%2FImage_created_with_a_mobile_phone.png%2F1200px-Image_created_with_a_mobile_phone.png&sp=1664313043T1e83d7fceccb2f114773507ac340c443e6558e356654d32cb48af705d524b058"

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

 

function draw() {
	context.clearRect(0,0,1000,1000)
  
			context.drawImage(test, 0, 0, 300, 300)
	context.scale(mapSize,mapSize)
		  
	for(x=0;x<map.length;x++){
		for(y=0;y<map[0].length;y++){
					
			context.drawImage(block_img[0], x*30, y*30, 30, 30)
			context.drawImage(block_img[map[x][y]], x*30, y*30, 30, 30)
			
				
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
