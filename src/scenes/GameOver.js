class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('gameOver', './assets/GAME_OVER.png')
        this.load.audio('sfx_select', './assets/select_Current.wav');
    }

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
            fontSize: '14px',
            backgroundColor: '#8b0000',
            color: '#ffcccb',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'gameOver').setOrigin(0, 0);
        /*this.add.text(game.config.width / 2, game.config.height / 2 - 160, 'GAME OVERRRRR',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 96, 'Press (R) to Restart or ← to Menu',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Credits:',overConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 96, 'Collaborators: Charles Cenizal (Programmer), Jacob Yu (Programmer), Efrain Luengas (Artist)',overConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 128, 'Music: Made by Jacob Yu',overConfig).setOrigin(0.5);*/
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.start("menu2Scene");
        }
    }
 }
