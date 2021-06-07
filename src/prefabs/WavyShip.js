class WavyShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, waveMagnitude, lives) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 4;       // pixels per frame
        this.clock = Math.floor(Math.random() * 10);
        this.waveSpeed = 0.05;
        this.randheight = Math.floor(Math.random() * game.config.height);
        this.lifePoints = lives;
        this.waveMag = waveMagnitude;
    }

    update() {
        //this.game.settings.health -= 1;
        //console.log(this.game.settings.health);
        this.clock += this.waveSpeed;

        this.x -= (this.moveSpeed * game.settings.speedMultiplier);
        this.y = Math.sin(this.clock) * this.waveMag + this.randheight;



        // wrap around

        if (this.x <= 95 - this.width && this.lifePoints > 0) {
            if (this.visible) {
                game.settings.health -= 3;
            }
            this.reset();
        }
    }
    // position reset
    reset() {
        this.setActive(true);
        this.setVisible(true);
        this.x = game.config.width;
        this.randheight = Math.floor(Math.random() * (game.config.height - 65));
        if (this.randheight < 34) {
            this.randheight = 34;
        }
        this.y = this.randheight;
    }

    takeDamage() {
        this.lifePoints -= 1;
    }
}
