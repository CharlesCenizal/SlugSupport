class WavyShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 4;       // pixels per frame
        this.clock = 0;
        this.waveSpeed = 0.05;
        this.randheight = Math.floor(Math.random() * game.config.height);
    }

    update() {
        this.clock += this.waveSpeed;
        
        this.x -= this.moveSpeed;
        this.y = Math.sin(this.clock) * 30 + this.randheight;

        

        // wrap around

        if (this.x <= 0 - this.width) {
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

}
