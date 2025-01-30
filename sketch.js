let player;
let bullets =[]
let enemies =[]
let packs = [] // array with objects, not to be confused with the variable 
let towns =[]
let roads =[]
let lane = [576, 472, 368, 264]
let enemy_location_lane51=[1400, 1496, 1592, 1688, 1784]
let counter = 2; // counter for lane of player
let score = 0;
let distance = 0;
let heart = 3;
let speed = 4;
let replay_b;
let startButton;  // html element button, starts game
let controlsButton;  // html element button, shows rules
let backButton;  // html element button, redirects to home screen after controls
let creditsButton;  // credits button
let state=0; // for background image in home screen
let soundstate=true

// bullet system variables
let bullet_count = 0;
let pack_of_bullets = 3;

// animation variables
let state_player=false; // inverted damaged player animation 

// images variables
let sky;
let town_img;
let road_img;
let player_img;
let player_hit_img;
let enemy_img;
let heart_img;
let skull;
let reload_img;
let bullet_img;
let losing_img;
let pack_img;
// home screen images
let background; // home screen bakcground image
let title_img;
let controls_img; // rules image
let credits_img;  // the credits image
let soundon_img;
let soundoff_img;

// sound variables
let buttons_sound;
let shoot_sound;
let move_up_sound;
let move_down_sound;
let picking_pack_sound;
let player_attacked_sound;
let enemy_attacked_sound;
let reload_sound;
let homescreentheme_song;
let losingtheme_song;
let zombieunaliver_song;


function preload(){
  sky = loadImage('images1/sky.png');
  town_img = loadImage('images1/rodela_bg.png');
  road_img = loadImage('images1/rodela.png');
  player_img = loadImage('images1/base.png');
  player_hit_img = loadImage('images1/base_hit.png');
  enemy_img = loadImage('images1/zombie2.png');
  heart_img = loadImage('images1/heart.png');
  skull = loadImage('images1/skull_score.png');
  reload_img = loadImage('images1/reload.png');
  bullet_img = loadImage('images1/bullet.png');
  losing_img = loadImage('images1/dead.png');
  pack_img = loadImage('images1/bullet_pack.png');
  background = loadImage('images1/background.png');


  buttons_sound = loadSound('sounds1/fx/buttons.wav');
  shoot_sound = loadSound('sounds1/fx/shoot.wav');
  move_up_sound = loadSound('sounds1/fx/move_up.wav');
  move_down_sound = loadSound('sounds1/fx/move_down.wav');
  picking_pack_sound = loadSound('sounds1/fx/picking_pack.wav');
  player_attacked_sound = loadSound('sounds1/fx/player_attacked.wav');
  enemy_attacked_sound = loadSound('sounds1/fx/enemy_attacked.wav');
  reload_sound = loadSound('sounds1/fx/reload.wav');
  homescreentheme_song = loadSound('sounds1/homescreentheme.wav');
  losingtheme_song = loadSound('sounds1/losingtheme.wav');
  zombieunaliver_song = loadSound('sounds1/ZombieUnaliver.wav');
}


function setup() {
  noLoop()
  homescreentheme_song.play()
  homescreentheme_song.loop()

  createCanvas(1232, 680);
  rectMode(CORNERS)

  //text setup
  fill(255)
  textSize(40)
  textFont('Comic Sans MS');
  stroke(0)
  textAlign(CENTER, CENTER)

  // home screen
  title_img = createImg('images1/title.png', 'title')
  title_img.class('title')

  startButton = createImg('images1/play_button.png', 'play button')
  startButton.style('top: 55%;')
  startButton.class('button')
  startButton.mousePressed(gamesetup)

  controlsButton = createImg('images1/controls_button.png', 'controls button')
  controlsButton.class('button')
  controlsButton.style('top: 65%;')
  controlsButton.mousePressed(controls)

  creditsButton = createImg('images1/credits_button.png', 'credits button')
  creditsButton.class('button')
  creditsButton.style('top: 75%')
  creditsButton.mousePressed(credits)

  credits_img = createImg("images1/credits.png", "credits")
  credits_img.class('controls')
  credits_img.hide()
  
  controls_img = createImg("images1/controls.png", "controls")
  controls_img.class('controls')
  controls_img.hide();

  backButton = createImg('images1/back_button.png', 'back button')
  backButton.class('button')
  backButton.style('left: 42%; top:75%')
  backButton.hide()

  soundon_img = createImg('images1/soundon.png', 'sound on button')
  soundon_img.class('soundbutton')
  soundoff_img = createImg('images1/soundoff.png', 'sound off button')
  soundoff_img.class('soundbutton')
  soundoff_img.mousePressed(soundon)
  soundon_img.mousePressed(soundoff)
  soundon_img.hide()
  zombieunaliver_song.setVolume(0)
  homescreentheme_song.setVolume(0)
  losingtheme_song.setVolume(0)
}

function controls(){
  buttons_sound.play()
  controls_img.show()
  backButton.show()
  title_img.hide()
  creditsButton.hide()
  backButton.mousePressed(hidecontrols)
}

function hidecontrols(){
  buttons_sound.play()
  controls_img.hide()
  backButton.hide()
  title_img.show()
  startButton.show()
  controlsButton.show()
  creditsButton.show()
  credits_img.hide()
}

function credits(){
  buttons_sound.play()
  startButton.hide()
  controlsButton.hide()
  title_img.hide()
  creditsButton.hide()
  credits_img.show()
  backButton.show()
  backButton.mousePressed(hidecontrols)
}

function soundon(){
  buttons_sound.play()
  soundon_img.show()
  soundoff_img.hide()
  zombieunaliver_song.setVolume(0.2)
  homescreentheme_song.setVolume(0.3)
  losingtheme_song.setVolume(0.2)
}

function soundoff(){
  buttons_sound.play()
  soundoff_img.show()
  soundon_img.hide()
  zombieunaliver_song.setVolume(0)
  homescreentheme_song.setVolume(0)
  losingtheme_song.setVolume(0)
}

function gamesetup(){
  homescreentheme_song.stop()
  zombieunaliver_song.play()
  zombieunaliver_song.loop()

  bullet_count = 7;
  state=1;
  startButton.hide()
  controlsButton.hide()
  controls_img.hide()
  backButton.hide()
  title_img.hide()
  creditsButton.hide()

  // setting up the backgrounds
for (let o=0; o<20; o++){
  let town={
     x: 6180*o,
     y: 0
    }
    towns.push(town);
}

for (o=0; o<20; o++){
  let road={
     x: 18540*o,
     y: 0
    }
    roads.push(road);
}

// spawning the first hoard of zombies
readyhoard()

// setting the player
player = new Player();

loop()
}

function draw() {
  // distance the player has run
  distance += speed;

  // create and move background
  image(sky, 0, 0, 1232,680);
  if (state===0){
  image(background,0,0,1232,680);
}
  for (let town of towns){
    town.x -= speed/2;
    image(town_img, town.x, 0);
  }

  for (let road of roads){
    road.x -= speed;
    image(road_img, road.x, 0);
  }

  // draw the player
  player.show();
  
  // draw the pack movement
  packsgo()

  // update and draw the bullets
  for (let bullet of bullets){
    bullet.x += speed*2
    circle(bullet.x, bullet.y, 20)
  }

  // draw the enemy movement
  hoardgo()
  
  // deal with collisions enemy-bullet
  bullet_hit_enemy()

  // deal with collisions enemy-player
  player_hit_enemy()

  // deal with collisions player-packs
  player_hit_pack()

  // losing 
  if (heart === 0){
    noSmooth();
    image(losing_img, 422,155,388,178)
    text('SCORE: ' + score, 620, 480)
    text('DISTANCE: ' + Math.floor(distance/60), 620, 560)
    zombieunaliver_song.stop()
    losingtheme_song.play()
    noLoop();
    clearTimeout(); // put a stop to the function readyhoard to stop zombies from spawning
    gameOver();
  }

  // set amount of bullets 
  if(bullet_count===0){
    image(reload_img,100,lane[counter]-20, 96, 20)
  }
  // score text
  image(skull, 30,30,40,40)
  text(score, 85,50)

  // heart text
  image(heart_img, 120,30,40,40)
  text(heart, 175,50)

  // bullet text
  image(bullet_img, 210,30,40,40)
  text(bullet_count + '/6', 285,50)
  for (let i=0;i<pack_of_bullets;i++){
    image(pack_img, 350+i*50,30,32,43)
  }

  // despawn zombies and bullets
  for (let enemy of enemies) {
    if (enemy.x <0) {
      enemies.splice(enemies.indexOf(enemy), 1)
    }
  }

  for (let bullet of bullets) {
    if (bullet.x > 1232) {
      bullets.splice(bullets.indexOf(bullet), 1)
    }
  }
}

//spawn a bullet on every click
function mousePressed(){
if (bullet_count>0 && pack_of_bullets>=0){
  shoot_sound.play()
    let bullet = {
      x: 190,
      y: lane[counter] + 56
    }
    bullets.push(bullet)
    bullet_count--;
  }
}

// move player
function keyPressed(){
  if (keyCode === UP_ARROW) {
    if (counter<3){
      move_up_sound.play()
      counter++;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (counter>0){
      move_down_sound.play()
      counter--;
    }
  }

  if (key === 'w') {
    if (counter<3){
      move_up_sound.play()
      counter++;
    }
  } else if (key === 's') {
    if (counter>0){
      move_down_sound.play()
      counter--;
    }
  }

  if (bullet_count>0){
    if (key === ' ') {
      shoot_sound.play()
      let bullet = {
        x: 190,
        y: lane[counter] + 56
      }
      bullets.push(bullet)
      bullet_count--;
    }
  }

  //reload
  if (pack_of_bullets > 0 && bullet_count!=6){
    if (key === 'r'| key==='R'){
      reload_sound.play();
      bullet_count = 6;
      pack_of_bullets--;
    }
  }
}

// ZOMBIE SPAWNING AND MOVEMENT

// a function that spawns the enemies in specific locations. for the first and third lane the deviation from those locations is 0 and for the second and fourth is -24px (avoiding overlap and too crowded zombie attacks) 
function spawn(lane, deviation){
    let enemy={
     r: 96,
     x: random(enemy_location_lane51) + deviation,
     y: lane}
     enemies.push(enemy);
}

// a function that prepares a hoard of zombies 
function readyhoard() {
    if (heart>0){
    spawn(264, 0) //576, 472, 368, 264
    spawn(264, 96)
    packspawn(264)
    spawn(368, -96)
    spawn(368, -48)
    packspawn(368)
    spawn(472, 0) 
    spawn(472, 48)
    packspawn(472)
    spawn(576, -96) 
    spawn(576, -48)
    packspawn(576)
    setTimeout(readyhoard, 3000)
  }
}


// movement of enemies
function hoardgo(){
  for (let enemy of enemies){
  enemy.x -= speed + speed/4
  image(enemy_img, enemy.x, enemy.y, 96, 96)
}
}

// bullet packs spawning
function packspawn(lane){
  if (random(1)<0.1)
    {let pack={
      x: random(enemy_location_lane51),
      y: lane
     }
    packs.push(pack)}
}

// movement of packs
function packsgo(){
  for (let pack of packs){
    pack.x-= speed 
    image(pack_img, pack.x, pack.y+30, 32,43)
  }
}

// COLLISION WITH ENEMIES AND BULLETS

// bullet collision with enemy
function bullet_hit_enemy(){
for(let enemy of enemies){
  for (let bullet of bullets){
    if (kill(enemy, bullet)){
      enemy_attacked_sound.play()
      score++;
      enemies.splice(enemies.indexOf(enemy), 1)
      bullets.splice(bullets.indexOf(bullet), 1)
    }
  }
}
}

function kill(enemy, bullet){
  return collideRectCircle(enemy.x,enemy.y,96,96,bullet.x, bullet.y,20)
}

// zombie collision with player
function player_hit_enemy(){
  for (let enemy of enemies){
    if (player.hits(enemy)){
           enemies.splice(enemies.indexOf(enemy), 1)
           player_attacked_sound.play()
           heart--;
           state_player=true;
           setTimeout(player.undoState, 300)
       }
  }
}

// player collision with pack
function player_hit_pack(){
  if (pack_of_bullets<10){
  for (let pack of packs){
    if (player.hitspack(pack)){
      picking_pack_sound.play()
      packs.splice(packs.indexOf(pack), 1)
      pack_of_bullets++;
    }
  }}
}

// game over button
function gameOver(){
  replay_b = createImg('images1/replay.png', 'replay button')
  replay_b.class('button');
  replay_b.mousePressed(replay);
}

// replay function
function replay(){
  replay_b.hide();
  reset();
  gamesetup();
  loop();
}

function reset(){
  clear()
  counter = 2;
  heart=3;
  score=0;
  distance =0;
  bullet_count=7;
  pack_of_bullets = 3;
  bullets =[]
  packs = []
  enemies =[]
  towns =[]
  roads =[]
}

// ti moy menei na kanw:
//sprite animations