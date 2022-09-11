const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d"); // create a context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 1;
const friction = 0.9;
const ballLimit = 100;

document.addEventListener("mousemove", (e) => {
  if (e.y > 40) {
    const config = {
      height: random(10, 40),
      width: this.height,
      color: colors[Math.round(random(0, 16))],
      Yvelocity: random(-10, 10),
      Xvelocity: random(-10, 10),
      xv: e.x,
      yv: e.y,
    };
    ballsArray.push(new Ball(config));
    if (ballsArray.length > ballLimit) {
      ballsArray.shift();
    }
  }
});

// utility functions
function random(min, max) {
  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min
   * if min isn't an integer) and no greater than max (or the next integer
   * lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  return Math.random() * (max - min) + min;
}

// random colors
var colors = [
  "aqua",
  "black",
  "blue",
  "fuchsia",
  "gray",
  "green",
  "lime",
  "maroon",
  "navy",
  "olive",
  "orange",
  "purple",
  "red",
  "silver",
  "teal",
  "white",
  "yellow",
];

var ballsArray = [];
class Ball {
  constructor({
    height = 10,
    width = 10,
    xv = innerWidth / 2,
    yv = innerHeight / 2,
    radius = 40,
    color = "black",
    Yvelocity = 1,
    Xvelocity = 1,
  }) {
    this.height = height;
    this.width = width;
    this.xv = xv;
    this.yv = yv;
    this.radius = radius;
    this.color = color;
    this.Yvelocity = Yvelocity;
    this.Xvelocity = Xvelocity;
  }
  update() {
    console.log(this.Yvelocity);
    if (this.yv + this.radius > innerHeight || this.yv - this.radius < 0) {
      // if the ball hits the ground apply friction to its x and y vilocity
      this.Yvelocity = -this.Yvelocity * friction;
      this.Xvelocity = this.Xvelocity * 0.99;
    } else {
      // if there the ball doesn't hits the ground apply gravity to it
      this.Yvelocity += gravity;
    }
    if (
      this.xv + this.radius + this.Xvelocity > innerWidth ||
      this.xv - this.radius < 0
    ) {
      // if the ball hits one of the walls apply friction to it
      this.Xvelocity = -this.Xvelocity * friction;
    }
    this.xv += this.Xvelocity;
    this.yv += this.Yvelocity;

    this.draw();
  }
  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.xv, this.yv, this.radius, Math.PI * 2, false);
    c.fill();
    c.shadowColor = "black";
    c.shadowBlur = 40;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.closePath();
  }
}

// animate ball1
function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  if (ballsArray.length > 0) {
    for (var i = 0; i < ballsArray.length; i++) {
      ballsArray[i].update();
    }
  }
  requestAnimationFrame(animate);
}
animate();
