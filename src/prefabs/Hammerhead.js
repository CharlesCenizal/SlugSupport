class Hammerhead extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, lives) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 7;       // pixels per frame
        this.active = false;
        this.lifePoints = lives;
    }

    update(time,delta,counter) {
        if (this.active) {
            // move hammerhead left
            this.x -= (this.moveSpeed * game.settings.speedMultiplier);
        }

        // wrap around

        if (this.x <= 0 - this.width && this.lifePoints > 0) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.setActive(true);
        this.setVisible(true);
        this.active = false;
        this.x = game.config.width;
        let randheight = Math.floor(Math.random() * game.config.height);
        if (randheight < 34) {
            randheight = 34;
        }
        this.y = randheight;
    }

    takeDamage() {
        this.lifePoints -= 1;
    }
}
