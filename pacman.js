
//creating the scores 
function drawScores(){
 
  //score 1 single player 
  var score1 = 0;

  document.getElementById("score1").innerHTML = "Score: " + score1; //printing score1 on the screen
  // document.write("Score: " + score1); 
 
  //if(a white circle is eaten by pacman){
    score1++; 
    document.getElementById("score1").innerHTML = "Score: " + score1; 
  //}
}

//creating the white dots 
function drawCircles(){
 
  var canvas = document.getElementById('circle');
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(5, 5, 0.25); //(x position, y position, radius)
  ctx.fillStyle() = "white"; //maybe there is no ()
  ctx.fill();
  
}

//http://10.204.123.46:3000/ (to run the git hub files)










// Sources used:
// - https://www.w3schools.com/js/js_output.asp
// - https://www.w3resource.com/javascript-exercises/javascript-drawing-exercise-2.php
