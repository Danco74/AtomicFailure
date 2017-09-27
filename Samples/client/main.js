var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
context.imageSmoothingQuality = "Medium";
canvas.font = '30px Arial';

// load image from data url
var imageObj = new Image();
imageObj.onload = function() {
  context.drawImage(this, 0, 0, 50,25);
};
imageObj.src = "assets/bomb.png";