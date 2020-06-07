class Player {
  constructor() {
    this.dist = 0;
    this.index = 0;
    this.horse = "Chetak";
    this.name = "Player_name";
  }
  update() {
    db.ref('players/player' + this.index).update({
      dist: this.dist,
      index: this.index,
      name: this.name
    });
  }
  updateRank(r) {
    db.ref('/').update({
      atEnd: r
    })
  }
}