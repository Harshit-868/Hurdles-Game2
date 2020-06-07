const db = firebase.database();
var players = [];
var timer = 15;
var form, game, player, atEnd;
var gameState, playerCount, winner;
var allPlayers, plr1, plr2, plr3;
var h1, h2, h3;
var r;

var trackImg, runImg1, runImg2, jumpImg1, jumpImg2, hurdleImg;
var boingSound;

function preload() {
  trackImg = loadImage("images/track.jpg");
  runImg1 = loadImage("images/rider1-run.png");
  jumpImg1 = loadImage("images/rider1-jump.png");
  runImg2 = loadImage("images/rider2-run.png");
  hurdleImg = loadImage("images/hurdle.png");
  boingSound = loadSound("sounds/boing.mp3");
}

function setup() {
  createCanvas(displayWidth - 300, displayHeight - 160);
  game = new Game();
  game.start();
  db.ref("gameState").on('value', (data) => {
    gameState = data.val();
  });
  db.ref('players').on("value", (data) => {
    allPlayers = data.val();
  });
  db.ref('atEnd').once('value', (data) => {
    player.rank = data.val();
  });
  db.ref('winner').on("value", (data) => {
    winner = data.val();
  });
  db.ref('refresh').on('value', (data) => {
    r = data.val();
  })
}

function draw() {
  if (winner == "" || winner == undefined) {
    if (playerCount == 3) {
      game.updateState(1);
    }
    if (gameState == 1) {
      game.play();
    }
  } else if (winner != "" && winner != undefined) {
    form.hide();
    background(150, 225, 255);
    textAlign(CENTER);
    fill("black");
    textSize(50);
    textStyle(BOLD);
    text(winner + " wins the race!", displayWidth/2, 100);
    if (!r && gameState === 2) {
      location.reload();
    }
    db.ref('/').update({
      gameState: 0
    });
  }
}
