class Form {
  constructor() {
    this.title = createElement('h1', "Multi-Player Hurdles Game");
    this.input = createInput("Player_name", 'text');
    this.h = createElement('h3', "Choose your horse:");

    this.b1 = createButton("Chetak");
    this.b2 = createButton("Bolt");
    this.b3 = createButton("Black Jack");

    this.btn = createButton("Play!");
    this.msg = createElement('h2');
  }
  display() {
    background(150, 225, 255);
    this.input.position(displayWidth/2 - 140, displayHeight/2 - 125);
    this.title.position(displayWidth/2 - 300, 75);
    var horse = "Chetak";
    
    this.h.position(displayWidth/2 - 150, displayHeight/2 - 50)
    this.b1.position(displayWidth/2 - 225, displayHeight/2 + 50);
    this.b2.position(displayWidth/2 - 75, displayHeight/2 + 50);
    this.b3.position(displayWidth/2 + 75, displayHeight/2 + 50)
    
    this.btn.position(displayWidth/2 - 75, displayHeight/2 + 150);
    
    this.btn.mousePressed(() => {
      this.input.hide();
      this.btn.hide();
      this.h.hide();
      this.b1.hide();
      this.b2.hide();
      this.b3.hide();

      playerCount ++;
      db.ref('/').update({
        index: playerCount
      });

      player.index = playerCount;
      player.name = this.input.value();
      player.horse = horse;
      player.update();
      
      this.title.html("Hello, " + this.input.value() + "!");
      this.title.position(displayWidth/2 - 250, 75);
      this.msg.html("Waiting for players...");
      this.msg.position(displayWidth/2 - 200, displayHeight/2 - 100);
    });

    this.b1.mousePressed(() => {
      horse = "Chetak";
    });
    this.b2.mousePressed(() => {
      horse = "Bolt";
    });
    this.b3.mousePressed(() => {
      horse = "Black Jack";
    });

  }
  hide() {
    this.title.hide();
    this.msg.hide();
    this.input.hide();
    this.btn.hide();
    this.h.hide();
    this.b1.hide();
    this.b2.hide();
    this.b3.hide();
  }
}