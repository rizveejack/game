let gameScreen = new Phaser.Scene("Game");

gameScreen.preload = function () {
  this.load.image("bg", "assets/bg.png");
  this.load.image("basket", "assets/basket.png");
  this.load.image("apple", "assets/apple.png");
};

gameScreen.create = function () {
  this.add.sprite(0, 0, "bg").setOrigin(0, 0);
  this.basket = this.physics.add.sprite(260, 460, "basket");
  this.basket.setCollideWorldBounds(true);
  this.basket.setImmovable(true);
  this.basket.body.allowGravity = false;

  //work with apple
  this.apple = this.physics.add.sprite(150, 100, "apple");
  this.apple.setMaxVelocity(0, 400);

  //Add score text
  this.score = 0;
  this.scoreText = this.add.text(10, 10, "Score: 0", {
    fontSize: "16px",
    fill: "#000",
    align: "center",
  });

  // Enable touch input
  this.input.addPointer(1);
};

gameScreen.update = function () {
  let pointer = this.input.activePointer;

  // Update basket position based on mouse or touch input
  this.basket.x = pointer.x;
  if (this.basket.x < 50) {
    this.basket.x = 50;
  }
  if (this.basket.x > 450) {
    this.basket.x = 450;
  }

  if (this.apple.y > 450) {
    this.apple.y = 100;
    this.apple.x = 400;
  }

  // Catch the apple
  if (this.physics.overlap(this.basket, this.apple)) {
    this.apple.y = 100;
    const min = 50;
    const max = 450;
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    this.apple.x = randomInteger;

    // Update score
    this.score += 1;
    this.scoreText.setText("Score: " + this.score);
  }
};

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 530,
  scene: gameScreen,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
      debug: false,
    },
  },
};

let game = new Phaser.Game(config);
