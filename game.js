var socket = io();

var myX = 0, myY = 0;

var positionsX = []
var positionsY = []
socket.on('position',function (id,x,y){
positionsX[id]=x
positionsY[id]=y

})

function update() {
	myX = myX+(mouseX-myX)/10;
	myY = myY+(mouseY-myY)/10;
  socket.emit('position',myX,myY);    

}

function draw() {
	// This is how you draw a rectangle
	context.clearRect(0,0,1000,1000)
	for(var k=0;k<positionsX.length;k+=1){
    context.fillRect(positionsX[k], positionsY[k], 30, 30); 
    }
    
    
    }

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);

    
}
