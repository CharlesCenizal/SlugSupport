class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {

        this.load.image('menu', './assets/MenuScreen.png')
        this.load.audio('sfx_select', './assets/discord-leave.mp3');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/Shoot_Current.wav');
        this.load.audio('music','./assets/SlugSupportTheme.mp3')
        this.load.audio('explode', './assets/explosion38.wav');
    }
    // adding the menu
    create() {
        let menuConfig =
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
        // show menu text
        this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu').setOrigin(0, 0);
        //this.add.text(game.config.width / 2, game.config.height / 2 - 160, 'Slug Support: Anti Air Edition',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 96, '',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 32, '',menuConfig).setOrigin(0.5);

        menuConfig.backgorundColor = "#4B0082";
        menuConfig.color = '#ADD8E6';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← or → to play', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.music = this.sound.add('music');

        var musicConfig =
        {
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delate: 0
        }
        this.music.play(musicConfig);
        //this.add.text(20, 20, "Rocket Patrol Menu");
        // change scenes
        //this.scene.start("playScene")
    }
    update() {
        // Debug Line
        console.log("Start of Game");
        //this.music.play(musicConfig);
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings =
            {
                currWave: 1,
                turretSpeed: 4,
                speedMultiplier: 1,
                extraLives: 0,
                bulletSpeed: 0,
                sprayMagnitude: 0,
                maxAmmo: 1000, // High ammo for now
                health: 10
            };
            this.sound.play('sfx_select');
            // This line of code is for debugging
            console.log("now on wave " + game.settings.currWave);
            this.scene.start("tutorialScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings =
            {
                currWave: 1,
                turretSpeed: 4,
                speedMultiplier: 1,
                extraLives: 0,
                bulletSpeed: 0,
                sprayMagnitude: 0,
                maxAmmo: 1000, // High ammo for now
                health: 10
            };
            this.sound.play('sfx_select');
            this.scene.start("tutorialScene");
        }
    }

}
