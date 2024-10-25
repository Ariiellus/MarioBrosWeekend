/* global Phaser */

import { createAnimations } from "./animations.js";
import * as Phaser from "phaser";
import { checkControls } from "./controls.js";
import { initAudio, playAudio } from "./audio.js";
import { initSpritesheet } from './spritesheet.js';

let gameInstance = null; 

export const initializePhaserGame = () => {
  if (typeof window === 'undefined' || gameInstance) {
    return;
  }

  const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
      preload,
      create,
      update,
    },
  };

  gameInstance = new Phaser.Game(config);
};
 
function preload() {
  this.load.image('cloud1', '/assets/scenery/overworld/cloud1.png');
  this.load.image('floorbricks', '/assets/scenery/overworld/floorbricks.png');
  this.load.image('mountain1', '/assets/scenery/overworld/mountain1.png');
  this.load.image('mountain2', '/assets/scenery/overworld/mountain2.png');
  this.load.image('bush1', '/assets/scenery/overworld/bush1.png');
  this.load.image('bush2', '/assets/scenery/overworld/bush2.png');
  this.load.image('smallTube', '/assets/scenery/vertical-small-tube.png');
  this.load.image('mediumTube', '/assets/scenery/vertical-medium-tube.png');
  this.load.image('largeTube', '/assets/scenery/vertical-large-tube.png');
  this.load.image('block', '/assets/blocks/overworld/block.png');
  this.load.image('immovableBlock', '/assets/blocks/overworld/immovableBlock.png');
  this.load.image('final-flag', '/assets/scenery/final-flag.png');
  this.load.image('flag-mast', '/assets/scenery/flag-mast.png');
  this.load.image('castle', '/assets/scenery/castle.png');

  initAudio(this);
  initSpritesheet(this);
}

function create() {
  this.add.image(100, 50, 'cloud1')
    .setOrigin(0, 0)
    .setScale(0.15);

  this.add.image(256, 30, 'cloud1')
    .setOrigin(0, 0)
    .setScale(0.15);
  
  // Mountains
  this.add.image(0, 176, 'mountain2' )
    .setOrigin(0, 0)
    .setScale(0.5);
  
  this.add.image(256, 192, 'mountain1' )
    .setOrigin(0, 0)
    .setScale(0.5);

  this.add.image(770, 176, 'mountain2' )
    .setOrigin(0, 0)
    .setScale(0.5);
  
  this.add.image(1024, 192, 'mountain1' )
    .setOrigin(0, 0)
    .setScale(0.5);

  // Bushes
  this.add.image(376, 196, 'bush2' )
    .setOrigin(0, 0)
    .setScale(0.5);

  this.add.image(184, 196, 'bush1' )
    .setOrigin(0, 0)
    .setScale(0.5);

  this.add.image(668, 196, 'bush2' )
    .setOrigin(0, 0)
    .setScale(0.5);
  this.add.image(684, 196, 'bush2' )
    .setOrigin(0, 0)
    .setScale(0.5);

  this.add.image(956, 196, 'bush1' )
    .setOrigin(0, 0)
    .setScale(0.5);


  this.floor = this.physics.add.staticGroup();

// Scenario
  // Helper functions for creating multiple items
  function createFloor(floor, positions) {
    positions.forEach(pos => {
      floor.create(pos, this.sys.game.config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody();
    });
  }

  function createTubes(floor, tubePositions) {
    tubePositions.forEach(({ xPos, yOffset, tubeType }) => {
      floor.create(xPos, this.sys.game.config.height - yOffset, tubeType)
        .setOrigin(0, 0.5)
        .refreshBody();
    });
  }

  function createBlocks(floor, blockPositions) {
    blockPositions.forEach(({ xPos, yOffset, blockType }) => {
      floor.create(xPos, this.sys.game.config.height - yOffset, blockType)
        .setOrigin(0, 0)
        .refreshBody();
    });
  }

  // Ground
  createFloor.call(this, this.floor, [
    0, 128, 256, 384, 512, 640, 768, 896, 976, 1136, 1248, 1264, 1424, 1552, 1680, 
    1808, 1936, 2064, 2192, 2320, 2480, 2608, 2736, 2864, 2992, 3120, 3248
  ]);

  // Tubes
  createTubes.call(this, this.floor, [
    { xPos: 448, yOffset: 48, tubeType: 'smallTube' },
    { xPos: 608, yOffset: 56, tubeType: 'mediumTube' },
    { xPos: 736, yOffset: 64, tubeType: 'largeTube' },
    { xPos: 912, yOffset: 64, tubeType: 'largeTube' },
    { xPos: 2624, yOffset: 48, tubeType: 'smallTube' },
    { xPos: 2880, yOffset: 48, tubeType: 'smallTube' }
  ]);

  // First structure
  createBlocks.call(this, this.floor, [
    { xPos: 220, yOffset: 96, blockType: 'misteryBlock' }, // coin
    { xPos: 320, yOffset: 96, blockType: 'block' },
    { xPos: 336, yOffset: 96, blockType: 'misteryBlock' }, // mushroom
    { xPos: 352, yOffset: 96, blockType: 'block' },
    { xPos: 368, yOffset: 96, blockType: 'misteryBlock' }, // coin
    { xPos: 384, yOffset: 96, blockType: 'block' },
    { xPos: 352, yOffset: 152, blockType: 'misteryBlock' } // coin
  ]);

  // Second structure
  createBlocks.call(this, this.floor, [
    { xPos: 1232, yOffset: 96, blockType: 'block' },
    { xPos: 1248, yOffset: 96, blockType: 'misteryBlock' }, // mushroom
    { xPos: 1264, yOffset: 96, blockType: 'block' },
    { xPos: 1280, yOffset: 152, blockType: 'block' },
    { xPos: 1296, yOffset: 152, blockType: 'block' },
    { xPos: 1312, yOffset: 152, blockType: 'block' },
    { xPos: 1328, yOffset: 152, blockType: 'block' },
    { xPos: 1344, yOffset: 152, blockType: 'block' },
    { xPos: 1360, yOffset: 152, blockType: 'block' },
    { xPos: 1376, yOffset: 152, blockType: 'block' },
    { xPos: 1392, yOffset: 152, blockType: 'block' },

    { xPos: 1456, yOffset: 152, blockType: 'block' },
    { xPos: 1472, yOffset: 152, blockType: 'block' },
    { xPos: 1488, yOffset: 152, blockType: 'block' },  
    { xPos: 1502, yOffset: 152, blockType: 'misteryBlock' }, // coin
    { xPos: 1502, yOffset: 96, blockType: 'misteryBlock' }, // several coins

    { xPos: 1598, yOffset: 96, blockType: 'block' },
    { xPos: 1614, yOffset: 96, blockType: 'block' }, // star
  ]);

  // Third structure
  createBlocks.call(this, this.floor, [
    { xPos: 1696, yOffset: 96, blockType: 'misteryBlock' }, // coin
    { xPos: 1744, yOffset: 96, blockType: 'misteryBlock' }, // coin
    { xPos: 1744, yOffset: 152, blockType: 'misteryBlock' }, // coin
    { xPos: 1792, yOffset: 96, blockType: 'misteryBlock' } // coin
  ]);

  // Fourth structure
  createBlocks.call(this, this.floor, [
    { xPos: 1888, yOffset: 96, blockType: 'block' },
    { xPos: 1936, yOffset: 152, blockType: 'block' },
    { xPos: 1952, yOffset: 152, blockType: 'block' },
    { xPos: 1968, yOffset: 152, blockType: 'block' },
    { xPos: 2048, yOffset: 152, blockType: 'block' },
    { xPos: 2064, yOffset: 152, blockType: 'misteryBlock' }, // coin
    { xPos: 2080, yOffset: 152, blockType: 'misteryBlock' }, // coin
    { xPos: 2096, yOffset: 152, blockType: 'block' },
    { xPos: 2064, yOffset: 96, blockType: 'block' },
    { xPos: 2080, yOffset: 96, blockType: 'block' }
  ]);

  function createStairs(floor, xPos, yOffsets) {
    yOffsets.forEach(yOffset => {
      floor.create(xPos, this.sys.game.config.height - yOffset, 'immovableBlock')
        .setOrigin(0, 0)
        .refreshBody();
    });
  }

  // Fifth structure - Stairs left
  createStairs.call(this, this.floor, 2144, [48]);  
  createStairs.call(this, this.floor, 2160, [48, 64]);  
  createStairs.call(this, this.floor, 2176, [48, 64, 80]);  
  createStairs.call(this, this.floor, 2192, [48, 64, 80, 96]); 
  // Fifth structure - Stairs left (continued)
  createStairs.call(this, this.floor, 2240, [48, 64, 80, 96]); 
  createStairs.call(this, this.floor, 2256, [48, 64, 80]);  
  createStairs.call(this, this.floor, 2272, [48, 64]);  
  createStairs.call(this, this.floor, 2288, [48]);  

  // Sixth structure - Stairs right
  createStairs.call(this, this.floor, 2368, [48]); 
  createStairs.call(this, this.floor, 2384, [48, 64]);  
  createStairs.call(this, this.floor, 2400, [48, 64, 80]);  
  createStairs.call(this, this.floor, 2416, [48, 64, 80, 96]); 
  createStairs.call(this, this.floor, 2432, [48, 64, 80, 96]); 

  // Sixth structure - Stairs right (continued)
  createStairs.call(this, this.floor, 2480, [48, 64, 80, 96]); 
  createStairs.call(this, this.floor, 2496, [48, 64, 80, 96]); 
  createStairs.call(this, this.floor, 2512, [48, 64, 80]);  
  createStairs.call(this, this.floor, 2528, [48, 64]);  

  // Seventh structure
  createBlocks.call(this, this.floor, [
    { xPos: 2704, yOffset: 96, blockType: 'block' },
    { xPos: 2720, yOffset: 96, blockType: 'block' },
    { xPos: 2736, yOffset: 96, blockType: 'misteryBlock' }, // coin
    { xPos: 2752, yOffset: 96, blockType: 'block' }
  ]);

  // Eigth structure 
  const levels = [
    { yOffset: 48, xPositions: [2912, 2928, 2944, 2960, 2976, 2992, 3008, 3024, 3040] },
    { yOffset: 64, xPositions: [2928, 2944, 2960, 2976, 2992, 3008, 3024, 3040] }, 
    { yOffset: 80, xPositions: [2944, 2960, 2976, 2992, 3008, 3024, 3040] },
    { yOffset: 96, xPositions: [2960, 2976, 2992, 3008, 3024, 3040] },
    { yOffset: 112, xPositions: [2976, 2992, 3008, 3024, 3040] },
    { yOffset: 128, xPositions: [2992, 3008, 3024, 3040] },
    { yOffset: 144, xPositions: [3008, 3024, 3040] },
    { yOffset: 160, xPositions: [3024, 3040] }
  ];

  levels.forEach(level => {
    const { yOffset, xPositions } = level;
    xPositions.forEach(xPos => {
      this.floor.create(xPos, this.sys.game.config.height - yOffset, 'immovableBlock')
        .setOrigin(0, 0)
        .refreshBody();
    });
  });

  

  // Final
  this.floor.create(3184, this.sys.game.config.height - 199, 'flag-mast')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(3176, this.sys.game.config.height - 190, 'final-flag')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3248, this.sys.game.config.height - 112, 'castle')
    .setOrigin(0, 0)
    .refreshBody();

  // Characters
  this.mario = this.physics.add.sprite(64, 210, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(500);

  this.enemy = this.physics.add.sprite(352, this.sys.game.config.height - 30, 'goomba')
    .setOrigin(0, 1)
    .setCollideWorldBounds(false)
    .setGravityY(500)
    .setVelocityX(-50);

// goombas need to be fixed

/*   this.enemy = this.physics.add.sprite(640, this.sys.game.config.height - 30, 'goomba')
    .setOrigin(0, 1)
    .setCollideWorldBounds(false)
    .setGravityY(500)
    .setVelocityX(-50);
  
  this.enemy = this.physics.add.sprite(816, this.sys.game.config.height - 30, 'goomba')
    .setOrigin(0, 1)
    .setCollideWorldBounds(false)
    .setGravityY(500)
    .setVelocityX(-50);
  
  this.enemy = this.physics.add.sprite(840, this.sys.game.config.height - 30, 'goomba')
    .setOrigin(0, 1)
    .setCollideWorldBounds(false)
    .setGravityY(500)
    .setVelocityX(-50); */

  createAnimations(this);
  // misteryBlockItems

  this.coins = this.physics.add.staticGroup();
  this.coins.create(220, this.sys.game.config.height - 96, 'coin').anims.play('coin-idle', true);
  this.physics.add.overlap(this.mario, this.coins, collectCoin, null, this);

  this.physics.world.setBounds(0, 0, 3376, this.sys.game.config.height);
  this.physics.add.collider(this.mario, this.floor);
  this.physics.add.collider(this.enemy, this.floor);
  this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this);
  this.physics.add.collider(this.mario, this.blocks, blockIsBump, null, this);

  this.cameras.main.setBounds(0, 0, 3376, this.sys.game.config.height);
  this.cameras.main.startFollow(this.mario);

  this.enemy.anims.play('goomba-walk', true);
  this.keys = this.input.keyboard.createCursorKeys();
}

function collectCoin(mario, coin) {
  coin.disableBody(true, true)
  playAudio('coin-pickup', this);
}

// not working
function blockIsBump(mario, block) {
  if (mario.body.touching.up && block.body.touching.down) {
    block.setVelocityY(-50);
    playAudio('blockbump', this);

    setTimeout(() => {
      block.setVelocityY(0);
      block.setY(block.y);
    }, 200);
  }
}

function onHitEnemy(mario, enemy) {
  if (mario.body.touching.down && enemy.body.touching.up) {
    mario.setVelocityY(-180);
    enemy.anims.play('goomba-dead', true);
    playAudio('goomba-stomp', this);
    enemy.setVelocityX(0);
    mario.anims.play('mario-jump', true);
    setTimeout(() => {
      enemy.destroy();
    }, 300);
  }
  else { 
    killMario(this);
  }
}

function update() {
  checkControls(this);

  const { mario, scene } = this;

  if (mario.y >= this.sys.game.config.height) {
    killMario(this);
  }
}
function killMario ( game ) { 

  const { mario, scene } = game;

  if (mario.isDead) return;

  mario.isDead = true;
  mario.anims.play('mario-dead');
  mario.setCollideWorldBounds(false);
  playAudio('gameover', game);

  mario.body.checkCollision.none = true;
  mario.setVelocityX(0);

  setTimeout(() => {
    mario.setVelocityY(-350);
  }, 100);

  setTimeout(() => {
    scene.restart();
  }, 2000);
}