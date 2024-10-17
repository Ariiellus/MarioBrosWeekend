/* global Phaser */

import { createAnimations } from "./animations.js";
import Phaser from "phaser";
import { checkControls } from "./controls.js";
import { initAudio, playAudio } from "./audio.js";

let gameInstance = null; 

export const initializePhaserGame = () => {
  if (gameInstance) {
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
        debug: false
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,  
      autoCenter: Phaser.Scale.CENTER_BOTH  
    },
    scene: {
      preload,
      create,
      update
    }
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

  this.load.spritesheet('mario', '/assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
  this.load.spritesheet('goomba', '/assets/entities/overworld/goomba.png', { frameWidth: 16, frameHeight: 16 });
  this.load.spritesheet('misteryblock', '/assets/blocks/overworld/misteryblock.png', { frameWidth: 16, frameHeight: 16 });

  initAudio(this);
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
  // Ground 
  this.floor.create(0, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(128, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(256, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(384, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(512, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(640, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(768, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(896, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(976, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(1136, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(1248, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody(); 
  
    this.floor.create(1264, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody(); 
    
  this.floor.create(1424, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody(); 
  
  this.floor.create(1552, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody(); 

  this.floor.create(1680, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(1808, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(1936, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(2064, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody(); 
  
  this.floor.create(2192, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)    
    .refreshBody();
  
  this.floor.create(2320, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(2480, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(2608, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(2736, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody(); 

  this.floor.create(2864, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody(); 

  this.floor.create(2992, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(3120, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(3248, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  // Tubes
  this.floor.create(448, this.sys.game.config.height - 48, 'smallTube')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(608, this.sys.game.config.height - 56, 'mediumTube')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(736, this.sys.game.config.height - 64, 'largeTube')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(912, this.sys.game.config.height -64, 'largeTube')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(2624, this.sys.game.config.height - 48, 'smallTube')
    .setOrigin(0, 0.5)
    .refreshBody();
  
  this.floor.create(2880, this.sys.game.config.height - 48, 'smallTube')
    .setOrigin(0, 0.5)
    .refreshBody();

// Blocks
  // first structure
  this.floor.create(220, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(320, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(336, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(352, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(368, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(384, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(352, this.sys.game.config.height - 152, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();  

  // Second structure
  this.floor.create(1232, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(1248, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(1264, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(1280, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(1296, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(1312, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();  
  
  this.floor.create(1328, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(1344, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)     
    .refreshBody();
  
  this.floor.create(1360, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(1376, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(1392, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Second structure
  this.floor.create(1456, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody(); 
  
  this.floor.create(1472, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody(); 
  
  this.floor.create(1488, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody(); 

  this.floor.create(1504, this.sys.game.config.height - 152, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody(); 
  
  this.floor.create(1504, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody(); 

  this.floor.create(1600, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody(); 
  
  this.floor.create(1616, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();

  // Third structure
  this.floor.create(1696, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(1744, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();
    
  this.floor.create(1744, this.sys.game.config.height - 152, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(1792, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();
    
  // Fourth structure
  this.floor.create(1888, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(1936, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(1952, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(1968, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2048, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2064, this.sys.game.config.height - 152, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2080, this.sys.game.config.height - 152, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody(); 
  
    this.floor.create(2096, this.sys.game.config.height - 152, 'block')
    .setOrigin(0, 0)
    .refreshBody(); 
  
    this.floor.create(2064, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody(); 
  
  this.floor.create(2080, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody(); 
  
  //Fifth structure - Stairs left
  
  this.floor.create(2144, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2160, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2160, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2176, this.sys.game.config.height - 48, 'immovableBlock')  
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2176, this.sys.game.config.height - 64, 'immovableBlock')  
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2176, this.sys.game.config.height - 80, 'immovableBlock')  
    .setOrigin(0, 0)
    .refreshBody();
    
  this.floor.create(2192, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2192, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2192, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
    
  this.floor.create(2192, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();


  //Fifth structure - Stairs left
  this.floor.create(2240, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2240, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2240, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2240, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2256, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2256, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2256, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2272, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2272, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)  
    .refreshBody();
  
  this.floor.create(2288, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  //Sixth structure - Stairs right
  this.floor.create(2368, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2384, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2384, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2400, this.sys.game.config.height - 48, 'immovableBlock')  
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2400, this.sys.game.config.height - 64, 'immovableBlock')  
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2400, this.sys.game.config.height - 80, 'immovableBlock')  
    .setOrigin(0, 0)
    .refreshBody();
    
  this.floor.create(2416, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2416, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2416, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
    
  this.floor.create(2416, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2432, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2432, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2432, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
    
  this.floor.create(2432, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  //Sixth structure - Stairs right
  this.floor.create(2480, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2480, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2480, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2480, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
    
  this.floor.create(2496, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2496, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2496, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

  this.floor.create(2496, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2512, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
    this.floor.create(2512, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2512, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2528, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2528, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2544, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Seventh structure
  this.floor.create(2704, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2720, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2736, this.sys.game.config.height - 96, 'misteryblock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2752, this.sys.game.config.height - 96, 'block')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Eigth structure
  // Level 1
  this.floor.create(2912, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2928, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2944, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2960, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2976, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2992, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3008, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3024, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3040, this.sys.game.config.height - 48, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Level 2
  this.floor.create(2928, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2944, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2960, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2976, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2992, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3008, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3024, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3040, this.sys.game.config.height - 64, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Level 3
  this.floor.create(2944, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2960, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2976, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2992, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3008, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3024, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3040, this.sys.game.config.height - 80, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Level 4
  this.floor.create(2960, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2976, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2992, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3008, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3024, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3040, this.sys.game.config.height - 96, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Level 5
  this.floor.create(2976, this.sys.game.config.height - 112, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(2992, this.sys.game.config.height - 112, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3008, this.sys.game.config.height - 112, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3024, this.sys.game.config.height - 112, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3040, this.sys.game.config.height - 112, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Level 6
  this.floor.create(2992, this.sys.game.config.height - 128, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3008, this.sys.game.config.height - 128, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3024, this.sys.game.config.height - 128, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3040, this.sys.game.config.height - 128, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Level 7
  this.floor.create(3008, this.sys.game.config.height - 144, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3024, this.sys.game.config.height - 144, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3040, this.sys.game.config.height - 144, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  // Level 8
  this.floor.create(3024, this.sys.game.config.height - 160, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();
  
  this.floor.create(3040, this.sys.game.config.height - 160, 'immovableBlock')
    .setOrigin(0, 0)
    .refreshBody();

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
  this.mario = this.physics.add.sprite(3184, 210, 'mario')
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

  this.physics.world.setBounds(0, 0, 3376, this.sys.game.config.height);
  this.physics.add.collider(this.mario, this.floor);
  this.physics.add.collider(this.enemy, this.floor);
  this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this);

  this.cameras.main.setBounds(0, 0, 3376, this.sys.game.config.height);
  this.cameras.main.startFollow(this.mario);

  createAnimations(this);

  this.enemy.anims.play('goomba-walk', true);
  this.keys = this.input.keyboard.createCursorKeys();
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
    // stopAudio('gameover', game);
  }, 2000);
}
