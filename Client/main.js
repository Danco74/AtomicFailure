// var canvas = document.getElementById("canvas");
// var context = canvas.getContext("2d");
// context.imageSmoothingEnabled = false;
// context.imageSmoothingQuality = "Medium";
// canvas.font = '30px Arial';

// // load image from data url
// var imageObj = new Image();
// imageObj.onload = function () {
//     context.drawImage(this, 0, 0, 50, 50);
// };
// imageObj.src = "assets/bomb.png";




// var blasts = [];

// function drawBlast(points) {

//     for (var i in points) {
//         // context.beginPath();
//         // context.arc(points[i].x, points[i].y, 25, 0, 2 * Math.PI, false);
//         // context.fillStyle = 'orange';
//         // context.fill();
//         // context.lineWidth = 5;

//         var blastImage = new Image();
//         blastImage.xx = points[i].x;
//         blastImage.yy = points[i].y;
//         blastImage.onload = function () {
//             context.drawImage(this, this.xx,this.yy, 50, 50);
//         };
//         blastImage.src = "assets/collision.png";

//         blasts.push(blastImage);

//     }
// }

// var points =[
//     {
//         x: 100,
//         y: 100
//     },
//     {
//         x:100,
//         y:130
//     },
//     {
//         x:100,
//         y:160
//     },
//     {
//         x: 130,
//         y: 130
//     },
//     {
//         x:100,
//         y:130
//     },
//     {
//         x:70,
//         y:130
//     }

// ];

// drawBlast(points);