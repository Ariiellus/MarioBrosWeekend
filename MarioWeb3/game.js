/* global Phaser */

import { createAnimations } from "./animations.js";
import Phaser from "phaser";
import { checkControls } from "./controls.js";

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
  this.load.spritesheet('mario', '/assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
  this.load.audio('gameover', '/assets/sound/music/gameover.mp3');
}

function create() {
  this.add.image(100, 50, 'cloud1')
    .setOrigin(0, 0)
    .setScale(0.15);

  this.floor = this.physics.add.staticGroup();

  this.floor.create(0, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor.create(165, this.sys.game.config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.mario = this.physics.add.sprite(50, 100, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(500);

  this.physics.world.setBounds(0, 0, 2000, this.sys.game.config.height);
  this.physics.add.collider(this.mario, this.floor);

  this.cameras.main.setBounds(0, 0, 2000, this.sys.game.config.height);
  this.cameras.main.startFollow(this.mario);

  createAnimations(this);

  this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
  checkControls(this);

  const { mario, sound, scene } = this;

  if (mario.y >= this.sys.game.config.height) { 
    mario.isDead = true;
    mario.anims.play('mario-dead');
    mario.setCollideWorldBounds(false);
    try {
      this.sound.add('gameover', { volume: 0.2 }).play();
    } catch (e) {
    }

    setTimeout(() => {
      mario.setVelocityY(-350);
    }, 100);

    setTimeout(() => {
      scene.restart();
    }, 2000);
  }
}
