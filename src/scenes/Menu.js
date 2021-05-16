class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
    }
    // adding the menu
    create() {
        let menuConfig =
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F38141',
            color: '#843605',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
<<<<<<< HEAD
        this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map_1').setOrigin(0, 0);
        this.add.text(game.config.width / 2, game.config.height / 2 - 160, 'Shark Dodger',menuConfig).setOrigin(0.5);
<<<<<<< HEAD
        this.add.text(game.config.width / 2, game.config.height / 2 - 96, 'Use Arrow Keys to dodge the sharks',menuConfig).setOrigin(0.5);
=======
        this.add.text(game.config.width / 2, game.config.height / 2 - 96, 'Press up and down to dodge the sharks',menuConfig).setOrigin(0.5);
>>>>>>> 99690b5673df62a55048b686bdefd3f3ed2f5b31
        this.add.text(game.config.width / 2, game.config.height / 2 - 32, 'Press F for a speedboost',menuConfig).setOrigin(0.5);

        menuConfig.backgorundColor = "#4B0082";
        menuConfig.color = '#ADD8E6';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← or → to play', menuConfig).setOrigin(0.5);
=======
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use arrows to move & F to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgorundColor = "#00FF00";
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
>>>>>>> parent of 9a0d1a5 (fixes)

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //this.add.text(20, 20, "Rocket Patrol Menu");
        // change scenes
        //this.scene.start("playScene")
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings =
            {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings =
            {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }

}