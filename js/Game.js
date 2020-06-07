class Game {
  constructor() {}
  
  updateState(state) {
    db.ref('/').update({
      gameState: state
    });
  }

  async start() {
    player = new Player();
    form = new Form();
    form.display();
    
    await db.ref('index').on('value', (data) => {
      playerCount = data.val();
    });

    plr1 = createSprite(200, 400, 10, 10);
    plr2 = createSprite(200, 550, 10, 10);
    plr3 = createSprite(200, 700, 10, 10);
    players = [plr1, plr2, plr3];

    h1 = createSprite(0, 0, 10, 10);
    h2 = createSprite(0, 0, 10, 10);
    h3 = createSprite(0, 0, 10, 10);
  }
  play() {
    form.hide();
    clear();
    background(46);
    image(trackImg, 1250, -17, displayWidth * 5, displayHeight - 160);

    if (allPlayers != undefined) {
      var x;
      var y = 0;
      var index = 0;
      for (var plr in allPlayers) {
        index++;
        x = displayWidth + allPlayers[plr].dist;
        y += 150;
        players[index - 1].x = x;
        players[index - 1].y = y;
        if (player.index == index) {
          players[index - 1].addImage("rider1_running", runImg1);
          players[index - 1].addImage("rider1_jump", jumpImg1);
          players[index - 1].scale = 0.4;
          camera.position.x = players[index - 1].x + 250;
          camera.position.y = displayHeight/2 - 100;

          fill(0, 255, 0);
          textSize(20);
          text(player.horse, players[index - 1].x - 150, players[index - 1].y + 10);

          h1.addImage("hurdle_img", hurdleImg);
          h1.scale = 0.5;
          h1.x = 3000;

          h2.addImage("hurdle_img", hurdleImg);
          h2.scale = 0.5;
          h2.x = 4500;

          h3.addImage("hurdle_img", hurdleImg);
          h3.scale = 0.5;
          h3.x = 6000;

          h1.y = players[index - 1].y + 20;
          h2.y = players[index - 1].y + 20;
          h3.y = players[index - 1].y + 20;

          if (players[index - 1].collide(h1) || players[index - 1].collide(h2) || players[index - 1].collide(h3)) {
            player.dist -= 750;
            player.update();
            boingSound.play();
          }
          
          // Jump
          if (keyIsDown(32)) {
            if (timer <= 0) {
              players[index - 1].changeImage("rider1_running");
              players[index - 1].setDefaultCollider();
              h1.setDefaultCollider();
              h2.setDefaultCollider();
              h3.setDefaultCollider();
            } else {
              timer--;
              players[index - 1].changeImage("rider1_jump");
              players[index - 1].y -= 75;
              players[index - 1].setCollider("rectangle", 0, 0, 1, 1);
              h1.setCollider("rectangle", 0, 20, 1, 1);
              h2.setCollider("rectangle", 0, 20, 1, 1);
              h3.setCollider("rectangle", 0, 20, 1, 1);
            }
          } if (keyWentUp(32)) {
            timer = 15;
            players[index - 1].changeImage("rider1_running");
            players[index - 1].setDefaultCollider();
            h1.setDefaultCollider();
            h2.setDefaultCollider();
            h3.setDefaultCollider();
          }

        } else {
          players[index - 1].addImage("rider2_img", runImg2);
          players[index - 1].scale = 0.4;
        }
      }
    }

    // Move left and right
    if (player.dist < 6120 && player.index != null) {
      if (keyIsDown(RIGHT_ARROW)) {
        player.dist += 30;
        player.update();
      }
      if (keyIsDown(LEFT_ARROW) && player.dist > 0) {
        player.dist -= 30;
        player.update();
      }
    }

    // Finish the game
    if (player.dist == 6120) {
      db.ref("/").update({
        winner: player.name
      });
      game.updateState(2);
    }

    drawSprites();
  }
}
