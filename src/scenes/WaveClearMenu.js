class WaveClearMenu extends Phaser.Scene {
    constructor() {
        super("WaveClearMenuScene");
    }
    preload() {


        this.load.image('wave_clear_pic', './assets/good_clear.png')

        this.load.image('cleared', './assets/clear.jpg')

        this.load.audio('sfx_select', './assets/select_Current.wav');
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
        let overConfig =
        {
            fontFamily: 'Times',
            fontSize: '18px',
            backgroundColor: '#4B0082',
            color: '#ADD8E6',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        var newWave = game.settings.currWave+1;
        var str = "Get Ready for Wave " + newWave.toString();

        this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'wave_clear_pic').setOrigin(0, 0);

        this.clearWave = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'cleared').setOrigin(0, 0);


        menuConfig.backgroundColor = "#4B0082";
        menuConfig.color = '#ADD8E6';


        // define keys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

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
        //this.music.play(musicConfig);
        this.add.text(325, 460, "Current Wave: " + game.settings.currWave);
        // change scenes
        //this.scene.start("playScene")
    }
    update() {
        //this.music.play(musicConfig);
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            game.settings.speedMultiplier += .01;
            game.settings.currWave += 1;
            game.settings.turretSpeed += 2;
            this.sound.play('sfx_select');
            // This line of code is for debugging
            console.log("From Select -> now on wave " + game.settings.currWave);
            if (game.settings.currWave >= 10) {
                this.scene.start("wave10Scene");
                if (game.settings.currWave % 10 == 0 && game.settings.currWave != 10) {
                    game.settings.extraLives += 1;
                }
            }
            this.scene.start("wave" + game.settings.currWave + "Scene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            game.settings.speedMultiplier += .01;
            game.settings.currWave += 1;
            game.settings.maxAmmo += 50;
            this.sound.play('sfx_select');
            console.log("From Select -> now on wave " + game.settings.currWave);
            if (game.settings.currWave >= 10) {
                this.scene.start("wave10Scene");
                if (game.settings.currWave % 10 == 0 && game.settings.currWave != 10) {
                    game.settings.extraLives += 1;
                }
            }
            this.scene.start("wave" + game.settings.currWave + "Scene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyE)) {
            game.settings.speedMultiplier += .01;
            game.settings.currWave += 1;
            game.settings.bulletSpeed += 75;
            this.sound.play('sfx_select');
            console.log("From Select -> now on wave " + game.settings.currWave);
            if (game.settings.currWave >= 10) {
                this.scene.start("wave10Scene");
                if (game.settings.currWave % 10 == 0 && game.settings.currWave != 10) {
                    game.settings.extraLives += 1;
                }
            }
            //this.scene.start("wave" + game.settings.currWave + "Scene");
            this.scene.start("wave1Scene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            game.settings.speedMultiplier += .01;
            game.settings.currWave += 1;
            game.settings.sprayMagnitude += 20;
            this.sound.play('sfx_select');
            console.log("From Select -> now on wave " + game.settings.currWave);
            if (game.settings.currWave >= 10) {
                this.scene.start("wave10Scene");
                if (game.settings.currWave % 10 == 0 && game.settings.currWave != 10) {
                    game.settings.extraLives += 1;
                }
            }
            //this.scene.start("wave" + game.settings.currWave + "Scene");
            this.scene.start("wave1Scene");
        }
    }

}
