let balls = []
let sayings = ['GAME OVER', 'GET CRANKED', 'BOR GULLET']
let word
let score = 0
let wall
// Number of balls
let n = 15
// Length of wall
let l = 250
// Width of wall
let w = 40

// Create a difficulty multiplier where the more difficult equals more randomization of speed multipliers and sizes and more balls

// Create a Menu system that incoorperates user inputs (stuff at start) for difficulty and possibly game rectMode

// Artzy it up, make a background that makes the game interesting

function setup() {
  createCanvas(windowWidth, windowHeight)
  word = random(sayings)
  for (let i = 0; i < n; i++) {
    let b = new Ball
    balls.push(b);
  }
  wall = new Wall
}

function draw() {
  background(255)
	textAlign(CENTER)
			noStroke()
      fill(0)
      textSize(32)
      text(score, windowWidth - 50, 50)
  wall.show()
  for (let i = 0; i < balls.length; i++) {
    balls[i].move()
    balls[i].show()
    if (balls[i].x < balls[i].r / 3) {
      balls.splice(i, 1)
    }
  }
  let c = balls.length - 1
  if (c < 0) {
      textAlign(CENTER)
      fill(0)
      textSize(32)
      text(word, windowWidth / 2, windowHeight / 2)
  }
}

function mousePressed() {
  word = random(sayings)
  let c = balls.length - 1
  if (c < 0) {
		score = 0
    for (let i = 0; i < n; i++) {
      let b = new Ball
      balls.push(b);
    }
  }
}

// TO BE CONTINUED MAYBE? Each level gets harder
// class Game {
// constructor() {
// }
// }

class Wall {
  show() {
    fill(0)
    noStroke()
    rectMode(CENTER)
    if (mouseY < 0 + l / 2) {
      rect(0, l / 2, w, l)
    }
    if (mouseY > windowHeight - l / 2) {
      rect(0, windowHeight - l / 2, w, l)
    } else {
      rect(0, mouseY, w, l)
    }
  }
}

class Ball {
  constructor() {
    this.x = windowWidth / 2
    this.y = random(windowHeight / 5, windowHeight * 4 / 5)
    this.r = random(40, 110)
    this.speed = random(10, 20)
    this.speed2 = random(4, 10)
  }
  move() {
    this.y = this.y + this.speed2
    this.x = this.x + this.speed
    if (this.y > windowHeight || this.y < 0) {
      this.speed2 = this.speed2 * -1.05
    }
    if (this.x > windowWidth) {
      this.speed = this.speed * -1.05
    }
    if (mouseY < l && this.y < l + this.r / 1.98 && this.x < this.r / 2 + w / 2 || mouseY > windowHeight - l && this.y > windowHeight - l - this.r / 1.98 && this.x < this.r / 2 + w / 2) {
      this.speed = this.speed * -1.05
			score = score + 1
    } else if (this.x < this.r / 2 + w / 2 && this.y > mouseY - l / 2 - this.r / 1.98 && this.y < mouseY + l / 2 + this.r / 1.98) {
      this.speed = this.speed * -1.05
			score = score + 1
    }
  }
  show() {
    this.red = map(this.x, 0, windowWidth, 0, 255)
    this.g = map(this.y, 0, windowWidth, 0, 255)
    this.b = map(mouseY, 0, windowWidth, 0, 255)
    strokeWeight(5)
    stroke(this.red, this.g, this.red)
    fill(this.b, this.g, this.red)
    ellipse(this.x, this.y, this.r)
  }

}
