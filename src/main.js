// Comment Explanation for "Organization"
/*
Collaborator Names:
Charles Cenizal
Jacob Yu
Efrain Luengas

Date Completed:
5/4/21

Game Title:
 Shark Dodger

*/

/*
Creative tilt:
--------------------------------------------------------------
The portion of our game that is technically interesting
And also adds great visual style to the game is that the
tileSprite changes every 100 points
This was implemented using if else statements, modulus
and the .setTexture('image') method in order to add technical
involvement into the game.
--------------------------------------------------------------
*/

// game config

let physConfig = {
    default: 'arcade',
    arcade: {
        debug: false
    }
}

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: physConfig,
    scene: [Menu, Play, Wave1, Wave2, Wave3, Wave4, Wave5, Wave6, Wave7, Wave8, Wave9, Wave10, WaveClearMenu, GameOver]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 3;

// reserve keyboard bindings

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
