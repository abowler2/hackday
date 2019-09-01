//Parent object for sprites
class Populate {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.sprite = "";
    this.sideways = 101;
    this.upDown = 83;
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset () {
    this.x = 0;
    this.y = 415;
  }
}

//Player class
class Player extends Populate {
  constructor () {
    super();
    this.x = 0;
    this.y = 415;
    this.sprite = "images/char-boy.png";

    this.blueGemsCollected = 0;
    this.greenGemsCollected = 0;
    this.orangeGemsCollected = 0;
    this.gemsLeft = 0;
    this.score = 0;
    this.life = 5;
  }

//key input for Player
  handleInput (input) {
    switch (input) {
      case "left":
        if (this.x >= this.sideways) {
          this.x -= this.sideways;
        }
        break;
      case "right":
        if (this.x <= this.sideways * 3) {
          this.x += this.sideways;
        }
        break;
      case "up":
        if (this.y >= 83) {
          this.y -= this.upDown;
        }
        break;
      case "down":
        if (this.y <= this.upDown * 4) {
          this.y += this.upDown;
        }
        break;
    }
  }

  //updates player and sets condition for collision & win
  update () {
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.sideways / 2 > this.x && enemy.x < this.x + this.sideways / 2)) {
        this.life --;
        var heart = document.querySelectorAll("#heart img");
        if (heart.length > 1){
          heartEl.removeChild(heart[0]);
          this.reset();
        }
        else {
        //  heartEl.removeChild(heart[0]);
          this.reset();
          gameOver();
        };
        this.reset();
      }
    }


      for (let gem of allGems) {
        if ((gem.x + gem.sideways / 2 > this.x && gem.x < this.x + this.sideways / 2) &&
            (gem.y - gem.upDown / 2 < this.y && gem.y > this.y - this.upDown / 2)) {
              console.log(gemsLeft);
          gem.x = -10000;
          gem.y = -10000;
          gemsLeft--;

          switch (gem.color) {
            case "blue": 
              this.blueGemsCollected++;
              this.score += 100;
              break;
            case "green":
              this.greenGemsCollected++;
              this.score += 250;
              break;
            case "orange": 
              this.orangeGemsCollected++;
              this.score += 500;
              break;
            default:
              break;
          }

        }

        if (gemsLeft === 0 && this.score > 0) {
          resetGems();
        }
        
      }
    }
  }


const player = new Player();


//Array to hold Enemy objects
const allEnemies = [];


//Array to hold gems for points
let allGems = [];


// add life element to the player
// var lifeEl = document.getElementById('life');
var heartEl = document.getElementById('heart');
// var scoreEl = document.getElementById('score');
var wrapper = document.getElementsByTagName('');


//Enemy class
class Enemy extends Populate {
  constructor (x, y, speed) {
    super();
    this.x = x;
    this.y = y;

    this.direct = 1;

    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
    this.enemySprite = this.sprite;
  }

  //Smooth movement of Enemy objects across gameboard
  update (dt) {
    if (this.x < this.sideways * 5) {
      this.x += this.speed * dt;

      if (this.y > 250){
        this.direct = -1
      }
      if (this.y < 83){
        this.direct = 1
      }
      this.y += Math.floor(this.speed*this.direct*0.01)
    } else {
      this.x = -100;
      //this.speed = this.randMove(this.speed,5)
      this.y = this.randY(this.y)
    }
  }
  randMove (start,level) {
    return start+Math.floor(Math.random()*level*20)
  }
  randY (init_y) {
    init_y = 83+ (init_y+Math.floor(Math.random()*800))%250
    return init_y

    }
  }


class Gem extends Populate {
  constructor (color) {
    super();
    this.x = Math.floor(Math.random() * 5) * 101 + 25;
    this.y = Math.floor(Math.random() * 5) * 83 + 35; 
    this.color = color;
    this.speed = 0;
    this.sprite = "images/gem-"+color+".png";
    this.sideways = 50;
    this.upDown = 85;
  }
    
  }


const enemy1 = new Enemy(101, 83, 150);
const enemy2 = new Enemy(404, 166, 350);
const enemy3 = new Enemy(0, 249, 375);
const enemy4 = new Enemy(0, 83, 100);
let gemsLeft = 0;
resetGems();

function resetGems() {
  allGems = [];

  for (i = 0; i < Math.random() * 3 + 1; i++) 
  {allGems.push(new Gem("blue"));
  gemsLeft++;
console.log(gemsLeft);}

  for (i = 0; i < Math.random() * 3 + 1; i++) 
  {allGems.push(new Gem("green"));
  gemsLeft++;}

  for (i = 0; i < Math.random() * 3 + 1; i++) 
  {allGems.push(new Gem("orange"));
  gemsLeft++;}
}


allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Game over
function gameOver() {
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('game-over-overlay').style.display = 'block';
  document.getElementById('play-again').addEventListener('click', function() {
        resetGame();
      });
}

// Reset game to original state
function resetGame() {
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('game-over-overlay').style.display = 'none';
  player.life = 5;

};
