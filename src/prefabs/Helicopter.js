class Helicopter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, hp) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 2;       // pixels per frame
        this.health = hp;
        this.hitpoints = hp;
    }

    update() {
        // move spaceshift left
        console.log(this.health + "health");
        if (this.health <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
        this.x -= this.moveSpeed;

        // wrap around

        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.setActive(true);
        this.setVisible(true);
        this.health = this.hitpoints;
        //console.log(this.moveSpeed);
        this.x = game.config.width;
        let randheight = Math.floor(Math.random() * game.config.height);
        if (randheight < 34) {
            randheight = 34;
        }
        this.y = randheight;
    }

}
