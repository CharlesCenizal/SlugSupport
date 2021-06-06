class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, lives) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 3;       // pixels per frame
        this.tempSpeed = 4;
        this.lifePoints = lives;
    }

    update() {
        // move spaceshift left
        this.x -= (this.tempSpeed * game.settings.speedMultiplier);

        // wrap around

        if (this.x <= 145 - this.width && this.lifePoints > 0) {
            this.reset();
            //this.game.settings.health -= 1;
            //console.log(this.game.settings.health);
        }
    }
    // position reset
    reset() {
        this.setActive(true);
        this.setVisible(true);
        //this.game.settings.health -= 1;
        //console.log(this.game.settings.health);
        this.tempSpeed = Math.ceil(Math.random() * 2) + this.moveSpeed;
        //console.log(this.moveSpeed);
        this.x = game.config.width;
        let randheight = Math.floor(Math.random() * (game.config.height - 34));
        if (randheight < 34) {
            randheight = 34;
        }
        this.y = randheight;
    }

    takeDamage() {
        this.lifePoints -= 1;
    }

}
