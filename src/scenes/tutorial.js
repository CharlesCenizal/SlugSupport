//tutorial with instructions
// comment
class tutorial extends Phaser.Scene{
  constructor() {
      super("tutorialScene");
  }

  preload() {

      this.load.image('map_1', './assets/game_title.png')
      this.load.audio('sfx_select', './assets/discord-leave.mp3');
      this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
      this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
      this.load.audio('music','./assets/UnderwaterJingle.mp3')
      this.load.audio('explode', './assets/roblox.mp3');
  }
  create()
  {
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
  // menu image
  this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map_1').setOrigin(0, 0);
  // show menu text
  this.add.text(game.config.width / 2, game.config.height / 2 - 250, 'TUTORIAL',menuConfig).setOrigin(0.5);
  this.add.text(game.config.width / 2, game.config.height / 2 - 175, 'Movement: Use Up and Down arrow keys',menuConfig).setOrigin(0.5);
  this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Fire: Press D and F to fire',menuConfig).setOrigin(0.5);
  this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← or → to play', menuConfig).setOrigin(0.5);
  // define keys

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

  }

  update()
  {
    console.log("Start of tutorial");

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
            health: 100
        };
        this.sound.play('sfx_select');
        // This line of code is for debugging
        console.log("now on wave " + game.settings.currWave);
        this.scene.start("wave" + game.settings.currWave + "Scene");
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
            health: 100
        };
        this.sound.play('sfx_select');
        this.scene.start("wave" + game.settings.currWave + "Scene");
    }







  }













}
