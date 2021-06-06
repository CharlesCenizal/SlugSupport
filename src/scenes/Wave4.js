//Wave 4
class Wave4 extends Phaser.Scene {
    constructor() {
        super("wave4Scene");
    }
    // preload

    preload() {
        // first background
        this.load.image('map_1', './assets/map1.png')
        this.load.image('bg1', './assets/bg1.png')
        this.load.image('rocket', './assets/TURRET.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('hammerhead', './assets/Hammerhead.png');
        this.load.audio('sfx_select', './assets/discord-leave.mp3');
        this.load.image('e1','./assets/enemy1.png')
        this.load.image('aircraft','./assets/aircraft.png')
        this.load.image('helicopter','./assets/helicopter.png')
        this.load.image('stealthPlane','./assets/stealthPlane.png')
        this.load.image('bullet','./assets/Bullet.png')

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }
    // adding the menu
    create() {
        // Debug line
        const bary = 40;
        const barx = 10;
        const width = 300;
        let healthConfig =
        {
            fontFamily: 'Times',
            fontSize: '18px',
            backgroundColor: '#ffffff',
            color: '#301934',
            align: 'right',
            padding:
            {
                top: 0,
                bottom: 0,
            },
            fixedWidth: 0
        }
        let healthConfig2 =
        {
            fontFamily: 'Times',
            fontSize: '32px',
            backgroundColor: '#8b0000',
            color: '#ffcccb',
            align: 'right',
            padding:
            {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }
        //this.totalEnemyLives = 12;
        this.totalEnemyLives = 2;
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: game.settings.maxAmmo
        });

        this.curr_background = this.add.tileSprite(0,0, game.config.width, game.config.height, 'bg1').setOrigin(0, 0);

        this.player1Rocket = new Rocket(this, 20, game.config.height / 2, 'rocket', game.settings.turretSpeed).setOrigin(0.5, 0.5);
        // add spaceshift (x3)
        this.add.text(barx, bary-36, 'Health',healthConfig);
        this.healthLeft = this.add.text(barx, bary, this.game.settings.health, healthConfig2);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4-75, 'e1', 0, 30, 2).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2-75, 'e1', 0, 20, 2).setOrigin(0, 0);
        this.wavyShip1 = new WavyShip(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'aircraft', 0, 10, 30, 1).setOrigin(0, 0);
        this.wavyShip2 = new WavyShip(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'aircraft', 0, 10, 30, 1).setOrigin(0, 0);
        this.helicopter = new Helicopter(this, game.config.width, borderUISize * 6 + borderPadding * 4-75, 'helicopter', 0, 10, 3, 2).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // developer skip scene

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

    }

    // update
    update(time, delta,counter) {


      if (this.totalEnemyLives == 0) {
          this.scene.start("WaveClearMenuScene");
      }

        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.shoot(this.player1Rocket.x + this.player1Rocket.width, this.player1Rocket.y);
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.shoot(this.player1Rocket.x + this.player1Rocket.width, this.player1Rocket.y);
        }

        this.bullets.children.each(function(bull) {
            if (bull.active) {
                if (bull.x > game.config.width) {
                  bull.setActive(false);
                }
            }
            if (this.checkCollision(bull, this.ship01)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.ship01);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.ship02)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.ship02);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.wavyShip1)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.wavyShip1);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.wavyShip2)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.wavyShip2);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.helicopter)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.helicopter.health -= 1;
                this.totalEnemyLives -= 1;
            }

        }.bind(this));

        this.curr_background.tilePositionX += starSpeed;

        if (!this.gameOver) {
            // update rocket
            this.player1Rocket.update();
            // update ships
            this.ship01.update();
            this.ship02.update();
            this.wavyShip1.update();
            this.wavyShip2.update();
            this.helicopter.update();
        }
        // REDUCING THE HEALTH
        if(parseInt(this.helicopter.x) == 0)
        {
          //console.log("goteem");
          console.log(this.helicopter.x);
          this.game.settings.health -= 1;
          console.log("helicopter the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.ship01.x) == 0)
        {
          //console.log("goteem");
          console.log(this.ship01.x);
          this.game.settings.health -= 1;
          console.log("1 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.ship02.x) == 0)
        {
          //console.log("goteem");
          console.log(this.ship02.x);
          this.game.settings.health -= 1;
          console.log("2 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.wavyShip1.x) == 0)
        {
          //console.log("goteem");
          console.log(this.wavyShip1.x);
          this.game.settings.health -= 1;
          console.log("wavyShip1 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.wavyShip2.x) == 0)
        {
          //console.log("goteem");
          console.log(this.wavyShip2.x);
          this.game.settings.health -= 1;
          console.log("wavyShip2 the health is now:" + this.game.settings.health);
        }
        this.healthLeft.text = parseInt(this.game.settings.health);

    }

    shoot(x, y) {
        let bullet = this.bullets.get(x, y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.x = 200 + game.settings.bulletSpeed;
            let upOrDown = Math.floor(Math.random() * 10) % 2;
            let randOffset = Math.random();
            if (upOrDown == 1) {
                bullet.body.velocity.y = game.settings.sprayMagnitude * randOffset;
            }
            else {
                bullet.body.velocity.y = game.settings.sprayMagnitude * randOffset * -1;
            }
        }
    }

    checkCollision(rocket, ship) {
        if (!rocket.active || !ship.active) {
          return false;
        }
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true; // collision
        }
        else {
            return false; // no collision
        }
    }

    shipExplode(ship) {
        this.sound.play('explode');
        ship.setVisible(false);
        ship.setActive(false);
        ship.takeDamage();
    }
}
