class WaveClearMenu extends Phaser.Scene {
    constructor() {
        super("WaveClearMenuScene");
    }
    preload() {

        this.load.image('map_1', './assets/game_title.png')
        this.load.audio('sfx_select', './assets/discord-leave.mp3');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('music','./assets/UnderwaterJingle.mp3')
        this.load.audio('explode', './assets/roblox.mp3');
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
        this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map_1').setOrigin(0, 0);
        this.add.text(game.config.width / 2, game.config.height / 2 - 160, 'WAVE CLEAR',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 96, '',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 32, '',menuConfig).setOrigin(0.5);

        menuConfig.backgorundColor = "#4B0082";
        menuConfig.color = '#ADD8E6';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← to upgrade movement', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding + 100, 'Press → to upgrade bullets', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.music = this.sound.add('music');

        var musicConfig =
        {
          mute: true,
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
        //this.music.play(musicConfig);
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings.currWave += 1;
            game.settings.turretSpeed += 1;
            this.sound.play('sfx_select');
            this.scene.start("wave" + game.settings.currWave + "Scene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings.currWave += 1;
            game.settings.maxAmmo += 1;
            this.sound.play('sfx_select');
            this.scene.start("wave" + game.settings.currWave + "Scene");
        }
    }

}
