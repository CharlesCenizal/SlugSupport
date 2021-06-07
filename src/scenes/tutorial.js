//tutorial with instructions
// comment
class tutorial extends Phaser.Scene{
  constructor() {
      super("tutorialScene");
  }

  preload() {

      this.load.image('map_1', './assets/tutorial.png')
      this.load.audio('sfx_select', './assets/select_Current.wav');
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
  /*this.add.text(game.config.width / 2, game.config.height / 2 - 250, 'TUTORIAL',menuConfig).setOrigin(0.5);
  this.add.text(game.config.width / 2, game.config.height / 2 - 175, 'Movement: Use Up and Down arrow keys',menuConfig).setOrigin(0.5);
  this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Fire: Press D and F to fire',menuConfig).setOrigin(0.5);
  this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding -25 , 'Tower Defense: You lose health when Planes get past you!', menuConfig).setOrigin(0.5);
  this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding +50 , 'When your health reaches zero, you lose ', menuConfig).setOrigin(0.5);
  this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding + 125, 'Press ← or → to play', menuConfig).setOrigin(0.5);*/

  // define keys

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 

  }

  update()
  {

    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        game.settings =
        {
            currWave: 1,
            turretSpeed: 4,
            speedMultiplier: 1,
            extraLives: 0,
            bulletSpeed: 0,
            sprayMagnitude: 0,
            maxAmmo: 1000, // High ammo for now
            health: 500
        };
        this.sound.play('sfx_select');
        this.scene.start("wave" + game.settings.currWave + "Scene");
    }
  }
}
