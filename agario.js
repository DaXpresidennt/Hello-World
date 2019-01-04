let balls = []
let n = 100

function setup() {
  createCanvas(windowWidth, windowHeight)
  for (i = 0; i < n; i++) {
    let b = new Ball
    balls.push(b)
  }
}

function draw() {
  background(210)
  for (i = 0; i < balls.length; i++) {
    balls[i].move()
    balls[i].show()
    for (j = 0; j < balls.length; j++) {
    // There is a problem here lol
      if (i != j && balls[i].intersects(balls[j])) {
        balls[i].x = balls[i].x + balls[j].speedx2
        balls[i].y = balls[i].y + balls[j].speedy2
        // Something with the checking, checking itself?
        balls.splice(j, 1)
      }
    }
  }
}

class Ball {
  constructor() {
    this.x = random(0, windowWidth)
    this.y = random(0, windowHeight)
    this.r = random(10, 30)
    this.speedx2 = random(-2, 2)
    this.speedy2 = random(-2, 2)
    this.colr = 0
    this.colg = 0
    this.colb = 0
  }
  move() {
    this.speedx = random(-1.5, 1.5)
    this.speedy = random(-1.5, 1.5)
    this.x = this.x + this.speedx + this.speedx2
    this.y = this.y + this.speedy + this.speedy2
    if (this.y > windowHeight - this.r/2 || this.y < this.r/2) {
      this.speedy2 = this.speedy2 * -1
    }
    if (this.x > windowWidth - this.r/2 || this.x < this.r/2) {
      this.speedx2 = this.speedx2 * -1
    }
  }
  show() {
    this.colr = map(this.r,10,350,0,255)
    this.colg = map(this.r,10,100,255,0)
    this.colb = map(this.r,10,150,0,25)
    fill(this.colr,this.colg,this.colb)
    stroke(0)
    strokeWeight(0.8)
    ellipse(this.x, this.y, this.r)
  }
  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y)
    if (d < this.r / 2 + other.r / 2 && this.r > other.r) {
      this.r = this.r + other.r/2
      return true;
    } else {
      return false;
    }
  }
}
