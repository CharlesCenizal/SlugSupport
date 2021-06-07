class Wave1 extends Phaser.Scene {
    constructor() {
        super("wave1Scene");
    }
    // preload

    preload() {
        // first background
        this.load.image('tower', './assets/TOWER.png')
        this.load.image('sky', './assets/noon_sky.png')
        this.load.image('hill1', './assets/noon_hill1.png')
        this.load.image('hill2', './assets/noon_hill2.png')
        this.load.image('hill3', './assets/noon_hill3.png')
        this.load.image('hill4', './assets/noon_hill4.png')
        this.load.image('rocket', './assets/TURRET.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('hammerhead', './assets/Hammerhead.png');
        this.load.audio('sfx_select', './assets/discord-leave.mp3');
        this.load.image('e1','./assets/enemy1.png')
        this.load.image('aircraft','./assets/aircraft.png')
        this.load.image('helicopter','./assets/helicopter.png')
        this.load.image('stealthPlane','./assets/stealthPlane.png')
        this.load.image('bullet','./assets/Bullet.png')

        this.load.spritesheet('explosion', './assets/explosion1.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }
    // adding the menu
    create() {
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
        this.add.text(barx,bary-36,"Health");
        const y = 24
	      const x = 10

	       // background shadow
	      //const leftShadowCap = this.add.image(x, y, 'left-cap-shadow').setOrigin(0, 0.5);

	      //const middleShaddowCap = this.add.image(leftShadowCap.x + leftShadowCap.width, y, 'middle-shadow').setOrigin(0, 0.5);
	     // middleShaddowCap.displayWidth = this.width;
      //  this.add.image(middleShaddowCap.x + middleShaddowCap.displayWidth, y, 'right-cap-shadow').setOrigin(0, 0.5);
        // Debug line

        this.totalEnemyLives = 4;
        //this.totalEnemyLives = 2;
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: game.settings.maxAmmo
        });

        this.sky = this.add.tileSprite(0,0, game.config.width, game.config.height, 'sky').setOrigin(0, 0);
        this.hill4 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'hill4').setOrigin(0, 0);
        this.hill3 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'hill3').setOrigin(0, 0);
        this.hill2 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'hill2').setOrigin(0, 0);
        this.hill1 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'hill1').setOrigin(0, 0);

        this.tower = new Tower(this, 0, 0, 'tower').setOrigin(0, 0);
        this.player1Rocket = new Rocket(this, 42, game.config.height / 2, 'rocket', game.settings.turretSpeed).setOrigin(0.5, 0.5);
        // add spaceshift (x3)
        //this.add.text(barx,bary-36,"Health");
        this.healthBar = this.add.graphics();
        this.healthBar.fillStyle(0x00ff80, 1);
        this.healthBar.fillRect(0, 0, game.settings.health, 25);
        this.healthBar.x = 150;
        this.healthBar.y = 10;

        //this.add.text(barx, bary-36, 'Health',healthConfig);
        // Health Number itself
        //this.healthLeft = this.add.text(barx, bary, this.game.settings.health, healthConfig2);
        //this.text.addColor('301934');
        //this.add.text(game.config.width-100,5, "Score", healthConfig);
        this.ship01 = new Spaceship(this, game.config.width, Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 30, 2).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 20, 2).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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

        // keeping score
        this.p1Score = 0;

        // display the score

    }

    // update
    update(time, delta,counter) {
        this.healthBar.clear();
        this.healthBar.fillStyle(0x00ff80, 1);
        this.healthBar.fillRect(0, 0, game.settings.health, 25);
        //console.log(this.healthLeft.text);
        // GAME OVER CONDITION
        if(this.game.settings.health <= 0)
        {
          this.scene.start("gameOverScene");
        }
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

        }.bind(this));

        this.hill4.tilePositionX += 0.25;
        this.hill3.tilePositionX += 0.50;
        this.hill2.tilePositionX += 0.75;
        this.hill1.tilePositionX += 1.00;

        if (!this.gameOver) {
            // update rocket
            this.player1Rocket.update();
            // update ships
            this.ship01.update();
            //this.game.settings.health -= 1;
            //console.log(this.game.settings.health);
            //console.log("ship01 pos");
            //console.log(this.ship01.x);
            /*if(1 == 1)
            {
              console.log("swag");
            }*/


            this.ship02.update();

        }
        // REDUCING THE HEALTH
        /*if(parseInt(this.ship01.x) == 150)
        {
          //console.log("goteem");
          console.log(this.ship01.x);
          this.game.settings.health -= 1;
          console.log("ship 1 the health is now:" + this.game.settings.health);
          this.healthLeft.text = parseInt(this.game.settings.health);
        }
        if(parseInt(this.ship02.x) == 150)
        {
          //console.log("goteem");
          console.log(this.ship02.x);
          this.game.settings.health -= 1;
          console.log("ship 2 the health is now:" + this.game.settings.health);
          this.healthLeft.text = parseInt(this.game.settings.health);
        }
        this.healthLeft.text = parseInt(this.game.settings.health);*/

    }

    shoot(x, y) {
        let bullet = this.bullets.get(x, y);
        if (bullet) {
            this.sound.play('sfx_rocket');
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
        if (!rocket.active || !ship.active || !ship.visible) {
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
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.takeDamage();
            ship.alpha = 1;
            boom.destroy();
        });
    }
    /* doesn't work
    getPosition(ship)
    {
      return this.ship.x;
    }
    */
}
