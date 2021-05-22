class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
        this.shotSpeed = 8;
        this.spray = 0;
    }
  
    update(time, delta, counter) {
        this.x += this.shotSpeed;
        if (this.x >= game.config.width) {
            this.destroy();
        }
        let upOrDown = Math.floor((Math.random() * 10));
        if (upOrDown%2 == 0) {
            upOrDown == -1;
        }
        else {
            upOrDown == 1;
        }
        this.y += Math.random() * this.spray * upOrDown;
    }
}
  
class BulletGroup extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
  
        this.createMultiple({
            classType: Bullet,
            active: true,
            visible: true,
            key: "bullet"
        })
    }
}