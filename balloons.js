var canvas = document.getElementById("balloons"),
    c = canvas.getContext('2d'),
    timer,
    mouseX,
    mouseY,
    canvasWidth,
    canvasHeight,
    maxRadius = 40,
    colorArray = ['#37CF52', '#3D5DC6', '#FF3D2E', '#DAEA4F', '#C342A5', '#53E2F7'],
    circleArray = [];
var myCircle = new Circle(30,80,10);
window.addEventListener("resize",resizeCanvas,false);
function resizeCanvas(){
    if (!!canvas) {
        canvasHeight = canvas.height = window.innerHeight;
        canvasWidth = canvas.width = window.innerWidth;
    }
    updateAll();
}
document.onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}
function Circle(xCoordinate, yCoordinate, radius) {
    var randomNumber = Math.floor((Math.random() * 6));
    var randomTrueOrFalse = Math.floor(Math.random() * 2);
    var randomTrueOrFalseTwo = Math.floor(Math.random() * 2);
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.radius = radius;
    this.color = colorArray[randomNumber];
    if (randomTrueOrFalse == 1) {
        this.xVelocity = -Math.random() * 2;
    } else {
        this.xVelocity = Math.random() * 2;
    }
    if (randomTrueOrFalse == 1) {
        this.yVelocity = -Math.random() * 2;
    } else {
        this.yVelocity = Math.random() * 2;
    }
    this.update = function() {
        this.xCoordinate += this.xVelocity;
        this.yCoordinate += this.yVelocity;
        var xDistance = mouseX - this.xCoordinate;
        var yDistance = mouseY - this.yCoordinate;
        var originalRadius = radius;
        if (this.xCoordinate + this.radius > canvasWidth || this.xCoordinate - this.radius < 0) {
            this.xVelocity = -this.xVelocity;
        };  
        if (this.yCoordinate + this.radius > canvasHeight || this.yCoordinate - this.radius < 0) {
            this.yVelocity = - this.yVelocity;  
        };
        if (xDistance < 50 && xDistance > -50 && this.radius < maxRadius && yDistance < 50 && yDistance > -50) {
            this.radius += 3;
        } else if ((xDistance >= 50 && originalRadius < this.radius) || (xDistance <= -50 && originalRadius < this.radius) || (yDistance >= 50 && originalRadius < this.radius) || (yDistance <= -50 && originalRadius < this.radius)) {
            if (this.radius > 3) {
                this.radius -= 3;
            } 
        };
        this.draw();
    }
    this.draw = function() {
        c.beginPath();
        c.arc(this.xCoordinate, this.yCoordinate, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color;
        c.fill();
    }
}
function count(){
    for (var i = 0; i < 4200; i++) {
        var randomXCoordinate = Math.random() * canvasWidth;
        var randomYCoordinate = Math.random() * canvasHeight;
        var randomRadius = Math.random() * 6;
        circleArray.push(new Circle(randomXCoordinate,randomYCoordinate ,randomRadius))
    }
}
function updateAll() {
    c.clearRect(0,0, canvasWidth, canvasHeight);
    myCircle.update();
    for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }
    clearTimeout(timer);
    timer = setTimeout(updateAll, 8)
}
resizeCanvas();
count()
updateAll();
