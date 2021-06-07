class Wave10 extends Phaser.Scene {
    constructor() {
        super("wave10Scene");
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
        this.totalEnemyLives = 66 + (game.settings.extraLives * 29);

        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: game.settings.maxAmmo
        });

        this.sky = this.add.tileSprite(0,0, game.config.width, game.config.height, 'sky').setOrigin(0, 0);
        this.hill4 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'hill4').setOrigin(0, 0);
        this.hill3 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'hill3').setOrigin(0, 0);
        this.hill2 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'hill2').setOrigin(0, 0);
        this.hill1 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'hill1').setOrigin(0, 0);
        // tower above health
        this.tower = new Tower(this, 0, 0, 'tower').setOrigin(0, 0);
        this.player1Rocket = new Rocket(this, 42, game.config.height / 2, 'rocket', game.settings.turretSpeed).setOrigin(0.5, 0.5);
        // add spaceshift (x3)
        //this.add.text(barx, bary-36, 'Health',healthConfig);
        //this.healthLeft = this.add.text(barx, bary, this.game.settings.health, healthConfig2);
        //this.add.text(game.config.width-100,5, "Score", healthConfig);

        this.healthBar = this.add.graphics();
        this.healthBar.fillStyle(0x00ff80, 1);
        this.healthBar.fillRect(0, 0, game.settings.health, 25);
        this.healthBar.x = 150;
        this.healthBar.y = 10;

        this.ship01 = new Spaceship(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 30, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 20, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 20, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 30, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.ship05 = new Spaceship(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 20, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.ship06 = new Spaceship(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 20, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.ship07 = new Spaceship(this, game.config.width, Math.floor(Math.random() * (game.config.height - 34)), 'e1', 0, 20, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.hammerhead = new Hammerhead(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'spaceship', 0, 10, 4 + game.settings.extraLives).setOrigin(0, 0);
        this.hammerhead2 = new Hammerhead(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'spaceship', 0, 10, 4 + game.settings.extraLives).setOrigin(0, 0);
        this.hammerhead3 = new Hammerhead(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'spaceship', 0, 10, 4 + game.settings.extraLives).setOrigin(0, 0);
        this.hammerhead4 = new Hammerhead(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 34)), 'spaceship', 0, 10, 4 + game.settings.extraLives).setOrigin(0, 0);
        this.wavyShip1 = new WavyShip(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 65)), 'aircraft', 0, 10, 50, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.wavyShip2 = new WavyShip(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 65)), 'aircraft', 0, 10, 50, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.wavyShip3 = new WavyShip(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 65)), 'aircraft', 0, 10, 50, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.wavyShip4 = new WavyShip(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 65)), 'aircraft', 0, 10, 50, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.wavyShip5 = new WavyShip(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 65)), 'aircraft', 0, 10, 50, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.wavyShip6 = new WavyShip(this, game.config.width, Math.floor(Math.random() * (game.config.height - 65)), 'aircraft', 0, 10, 50, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.helicopter = new Helicopter(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 65)), 'helicopter', 0, 10, 3, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.helicopter2 = new Helicopter(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 65)), 'helicopter', 0, 10, 3, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.helicopter3 = new Helicopter(this, game.config.width + Math.floor(Math.random() * 300), Math.floor(Math.random() * (game.config.height - 65)), 'helicopter', 0, 10, 3, 2 + game.settings.extraLives).setOrigin(0, 0);
        this.helicopter4 = new Helicopter(this, game.config.width, Math.floor(Math.random() * (game.config.height - 65)), 'helicopter', 0, 10, 3, 2 + game.settings.extraLives).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

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
    }

    // update
    update(time, delta,counter) {

        this.healthBar.clear();
        this.healthBar.fillStyle(0x00ff80, 1);
        this.healthBar.fillRect(0, 0, game.settings.health, 25);

        //this.healthLeft.text = game.settings.health;

      // GAME OVER CONDITION
      if(this.game.settings.health <= 0)
      {
        this.scene.start("gameOverScene");
      }
      if (this.totalEnemyLives <= 0) {
          this.player1Rocket.setVisible(false);
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
            else if (this.checkCollision(bull, this.ship03)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.ship03);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.ship04)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.ship04);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.ship05)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.ship05);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.ship06)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.ship06);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.ship07)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.ship07);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.hammerhead)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.hammerhead);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.hammerhead2)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.hammerhead2);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.hammerhead4)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.hammerhead4);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.hammerhead3)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.hammerhead3);
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
            else if (this.checkCollision(bull, this.wavyShip3)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.wavyShip3);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.wavyShip4)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.wavyShip4);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.wavyShip5)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.wavyShip5);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.wavyShip6)) {
                bull.setActive(false);
                bull.setVisible(false);
                this.shipExplode(this.wavyShip6);
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.helicopter)) {
                bull.setActive(false);
                bull.setVisible(false);
                if (this.helicopter.health <= 1) {
                    let boom = this.add.sprite(this.helicopter.x, this.helicopter.y, 'explosion').setOrigin(0, 0);
                    boom.anims.play('explode');
                    boom.on('animationcomplete', () => {
                        boom.destroy();
                    });
                }
                this.helicopter.health -= 1;
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.helicopter2)) {
                bull.setActive(false);
                bull.setVisible(false);
                if (this.helicopter2.health <= 1) {
                    let boom = this.add.sprite(this.helicopter2.x, this.helicopter2.y, 'explosion').setOrigin(0, 0);
                    boom.anims.play('explode');
                    boom.on('animationcomplete', () => {
                        boom.destroy();
                    });
                }
                this.helicopter2.health -= 1;
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.helicopter3)) {
                bull.setActive(false);
                bull.setVisible(false);
                if (this.helicopter3.health <= 1) {
                    let boom = this.add.sprite(this.helicopter3.x, this.helicopter3.y, 'explosion').setOrigin(0, 0);
                    boom.anims.play('explode');
                    boom.on('animationcomplete', () => {
                        boom.destroy();
                    });
                }
                this.helicopter3.health -= 1;
                this.totalEnemyLives -= 1;
            }
            else if (this.checkCollision(bull, this.helicopter4)) {
                bull.setActive(false);
                bull.setVisible(false);
                if (this.helicopter4.health <= 1) {
                    let boom = this.add.sprite(this.helicopter4.x, this.helicopter4.y, 'explosion').setOrigin(0, 0);
                    boom.anims.play('explode');
                    boom.on('animationcomplete', () => {
                        boom.destroy();
                    });
                }
                this.helicopter4.health -= 1;
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
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.ship05.update();
            this.ship06.update();
            this.ship07.update();
            this.wavyShip1.update();
            this.wavyShip2.update();
            this.wavyShip3.update();
            this.wavyShip4.update();
            this.wavyShip5.update();
            this.wavyShip6.update();
            this.helicopter.update();
            this.helicopter2.update();
            this.helicopter3.update();
            this.helicopter4.update();
            this.hammerhead.update();
            this.hammerhead2.update();
            this.hammerhead3.update();
            this.hammerhead4.update();
            if (!this.hammerhead.active) {
                let randInt = Math.floor((Math.random() * 100));
                if (randInt == 20) {
                    this.hammerhead.active = true;
                }
            }
            if (!this.hammerhead2.active) {
                let randInt = Math.floor((Math.random() * 100));
                if (randInt == 20) {
                    this.hammerhead2.active = true;
                }
            }
            if (!this.hammerhead3.active) {
                let randInt = Math.floor((Math.random() * 100));
                if (randInt == 20) {
                    this.hammerhead3.active = true;
                }
            }
            if (!this.hammerhead4.active) {
                let randInt = Math.floor((Math.random() * 100));
                if (randInt == 20) {
                    this.hammerhead4.active = true;
                }
            }
        }

        /*
        if(parseInt(this.ship01.x) == 100)
        {
          //console.log("goteem");
          console.log(this.ship01.x);
          this.game.settings.health -= 1;
          console.log("1 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.ship02.x) == 100)
        {
          //console.log("goteem");
          console.log(this.ship02.x);
          this.game.settings.health -= 1;
          console.log("2 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.ship03.x) == 100)
        {
          //console.log("goteem");
          console.log(this.ship03.x);
          this.game.settings.health -= 1;
          console.log("3 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.ship04.x) == 100)
        {
          //console.log("goteem");
          console.log(this.ship04.x);
          this.game.settings.health -= 1;
          console.log("4 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.ship05.x) == 100)
        {
          //console.log("goteem");
          console.log(this.ship05.x);
          this.game.settings.health -= 1;
          console.log("5 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.ship06.x) == 100)
        {
          //console.log("goteem");
          console.log(this.ship06.x);
          this.game.settings.health -= 1;
          console.log("6 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.ship07.x) == 100)
        {
          //console.log("goteem");
          console.log(this.ship07.x);
          this.game.settings.health -= 1;
          console.log("7 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.wavyShip1.x) == 100)
        {
          //console.log("goteem");
          console.log(this.wavyShip1.x);
          this.game.settings.health -= 1;
          console.log("wavyShip1 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.wavyShip2.x) == 100)
        {
          //console.log("goteem");
          console.log(this.wavyShip2.x);
          this.game.settings.health -= 1;
          console.log("wavyShip2 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.wavyShip3.x) == 100)
        {
          //console.log("goteem");
          console.log(this.wavyShip3.x);
          this.game.settings.health -= 1;
          console.log("wavyShip3 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.wavyShip4.x) == 100)
        {
          //console.log("goteem");
          console.log(this.wavyShip4.x);
          this.game.settings.health -= 1;
          console.log("wavyShip4 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.wavyShip5.x) == 100)
        {
          //console.log("goteem");
          console.log(this.wavyShip5.x);
          this.game.settings.health -= 1;
          console.log("wavyShip5 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.wavyShip6.x) == 100)
        {
          //console.log("goteem");
          console.log(this.wavyShip6.x);
          this.game.settings.health -= 1;
          console.log("wavyShip6 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.helicopter.x) == 100)
        {
          //console.log("goteem");
          console.log(this.helicopter.x);
          this.game.settings.health -= 10;
          console.log("helicopter the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.helicopter2.x) == 100)
        {
          //console.log("goteem");
          console.log(this.helicopter2.x);
          this.game.settings.health -= 10;
          console.log("helicopter2 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.helicopter3.x) == 100)
        {
          //console.log("goteem");
          console.log(this.helicopter3.x);
          this.game.settings.health -= 10;
          console.log("helicopter3 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.helicopter4.x) == 100)
        {
          //console.log("goteem");
          console.log(this.helicopter4.x);
          this.game.settings.health -= 10;
          console.log("helicopter4 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.hammerhead.x) == 100)
        {
          //console.log("goteem");
          console.log(this.hammerhead.x);
          this.game.settings.health -= 5;
          console.log("hammerhead the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.hammerhead2.x) == 100)
        {
          //console.log("goteem");
          console.log(this.hammerhead2.x);
          this.game.settings.health -= 5;
          console.log("hammerhead2 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.hammerhead3.x) == 100)
        {
          //console.log("goteem");
          console.log(this.hammerhead3.x);
          this.game.settings.health -= 5;
          console.log("hammerhead3 the health is now:" + this.game.settings.health);
        }
        if(parseInt(this.hammerhead4.x) == 100)
        {
          //console.log("goteem");
          console.log(this.hammerhead4.x);
          this.game.settings.health -= 5;
          console.log("hammerhead4 the health is now:" + this.game.settings.health);
        }
        this.healthLeft.text = parseInt(this.game.settings.health);*/

    }

    shoot(x, y) {
        let bullet = this.bullets.get(x, y);
        if (bullet && this.player1Rocket.visible) {
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
}
