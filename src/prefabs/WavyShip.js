class WavyShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, waveMagnitude, lives) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 4;       // pixels per frame
        this.clock = 0;
        this.waveSpeed = 0.05;
        this.randheight = Math.floor(Math.random() * game.config.height);
        this.lifePoints = lives;
        this.waveMag = waveMagnitude;
    }

    update() {
        this.clock += this.waveSpeed;

        this.x -= (this.moveSpeed * game.settings.speedMultiplier);
        this.y = Math.sin(this.clock) * this.waveMag + this.randheight;

        

        // wrap around

        if (this.x <= 0 - this.width && this.lifePoints > 0) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.setActive(true);
        this.setVisible(true);
        this.x = game.config.width;
        this.randheight = Math.floor(Math.random() * game.config.height);
        if (this.randheight < 34) {
            this.randheight = 34;
        }
        this.y = this.randheight;
    }

    takeDamage() {
        this.lifePoints -= 1;
    }
}
