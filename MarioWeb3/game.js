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
  this.load.spritesheet('mario', '/assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
  this.load.spritesheet('goomba', '/assets/entities/overworld/goomba.png', { frameWidth: 16, frameHeight: 16 });

  initAudio(this);
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

  this.enemy = this.physics.add.sprite(120, this.sys.game.config.height - 30, 'goomba')
    .setOrigin(0, 1)
    .setCollideWorldBounds(false)
    .setGravityY(500)
    .setVelocityX(-50);

  this.physics.world.setBounds(0, 0, 2000, this.sys.game.config.height);
  this.physics.add.collider(this.mario, this.floor);
  this.physics.add.collider(this.enemy, this.floor);
  this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this);

  this.cameras.main.setBounds(0, 0, 2000, this.sys.game.config.height);
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
       stopAudio('gameover', game);
    }, 2000);
  }
