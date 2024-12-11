let players =[]
let bullets =[]
let enemies =[]
let towns =[]
let roads =[]
let lane = [102, 85, 68, 51]
let lane_player = [
                  [102, 40],
                  [85, 30],
                  [68, 20],
                  [51, 10]
];
let enemy_location_lane51=[400, 424, 484, 472, 496]
let counter = 2; // counter for lane of player
let score = 0;
let heart = 3;
let speed = 1;

// images variables
let sky;
let town_img;
let road_img;
let player_img;
let enemy_img;



function preload(){
  sky = loadImage('images/sky.png');
  town_img = loadImage('images/rodela_bg.png');
  road_img = loadImage('images/rodela.png');
  player_img = loadImage('images/base.png');
  enemy_img = loadImage('images/zombie2.png');
}

function setup() {
  createCanvas(308, 132);
  rectMode(CORNERS)

  //setting up the backgrounds
  for (let o=0; o<20; o++){
    let town={
       x: 1445*o,
       y: 0
      }
      towns.push(town);
  }

  for (o=0; o<20; o++){
    let road={
       x: 4635*o,
       y: 0
      }
      roads.push(road);
  }

  // spawning the first hoard of zombies
  readyhoard()

  // setting the player
  let player={
    x: 25,
    y: lane_player[counter][0]
   }
   players.push(player);
}


function draw() {

  // create and move background
  image(sky, 0, 0, 308,132);

  for (let town of towns){
    town.x -= speed/2;
    image(town_img, town.x, 0);
  }

  for (let road of roads){
    road.x -= speed;
    image(road_img, road.x, 0);
  }

  // draw the player
  
  image(player_img, 25, lane_player[counter][0])
  
  // update and draw the bullets
  for (let bullet of bullets){
    bullet.x += 5
    circle(bullet.x, bullet.y, 5)
  }
  
  // draw the enemy movement
  hoardgo()
  
  // deal with collisions enemy-bullet
  bullet_hit_enemy()

  // deal with collisions enemy-player
  player_hit_enemy()

  // loosing 
  if (heart === 0){
    text('you loose', 150,65)
    fill(255)
    noLoop()
  }

  // score text
  text(score, 25,25)
  fill(255)

  // heart text
  text(heart, 50,25)
  fill(255)


  // despawn zombies and bullets
  for (let enemy of enemies) {
    if (enemy.x < -24) {
      enemies.splice(enemies.indexOf(enemy), 1)
    }
  }

  for (let bullet of bullets) {
    if (bullet.x > 308) {
      bullets.splice(bullets.indexOf(bullet), 1)
    }
  }
}

//spawn a bullet on every click
function mousePressed(){
  let bullet = {
    x: 45,
    y: lane_player[counter][0] + 14
  }
  bullets.push(bullet)
}

//move player
function keyPressed(){
  if (keyCode === UP_ARROW) {
    if (counter<3){
      counter++;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (counter>0){
      counter--;
    }
  }

  if (key === 'w') {
    if (counter<3){
      counter++;
    }
  } else if (key === 's') {
    if (counter>0){
      counter--;
    }
  }
}


// ZOMBIE SPAWNING AND MOVEMENT

// a function that spawns the enemies in specific locations. for the first and third lane the deviation from those locations is 0 and for the second and fourth is -24px (avoiding overlap and too crowded zombie attacks) 
function spawn(lane, deviation){
    let enemy={
     x: random(enemy_location_lane51) + deviation,
     y: lane}
     enemies.push(enemy);
}

// a function that prepares a hoard of zombies 
function readyhoard() {
    spawn(51, 0) //102, 85, 68, 51
    spawn(51, 12)
    spawn(68, -24) //102, 85, 68, 51
    spawn(68, -12)
    spawn(85, 0) //102, 85, 68, 51
    spawn(85, 12)
    spawn(102, -24) //102, 85, 68, 51
    spawn(102, -12)
    setTimeout(readyhoard, 3000)
}


// movement of enemies
function hoardgo(){
  for (let enemy of enemies){
  enemy.x -= speed + speed/4
  image(enemy_img, enemy.x, enemy.y, 24, 24)
}
}


// collision of enemies and player
function bullet_hit_enemy() {
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y - 14) < 10) {
        enemies.splice(enemies.indexOf(enemy), 1)
        bullets.splice(bullets.indexOf(bullet), 1)
        score++;
      }
    }
  }
}

function player_hit_enemy(){
  for (let enemy of enemies){
    for (let player of players){
      if (dist(enemy.x, enemy.y, player.x, player.y) < 10){
        enemies.splice(enemies.indexOf(enemy), 1)
        heart--;
        }
      }
  }
}


//sprite animations
//z index of player
//score and hearts text