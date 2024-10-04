export const createAnimations = (game) => {
  game.anims.create({
    key: 'mario-walk',
    frames: game.anims.generateFrameNumbers(
      'mario',
      { start: 1, end: 3 }
    ),
    frameRate: 2,
    repeat: -1
  })

  game.anims.create({
    key: 'mario-idle',
    frames: [{ key: 'mario', frame: 0 }]
  })

  game.anims.create({
    key: 'mario-jump',
    frames: [{ key: 'mario', frame: 5 }]
  })

  game.anims.create({
    key: 'mario-dead',
    frames: [{ key: 'mario', frame: 4 }]
  })

  game.anims.create({
    key: 'goomba-walk',
    frames: game.anims.generateFrameNumbers(
      'goomba',
      { start: 0, end: 1 }
    ),
    frameRate: 2,
    repeat: -1
  })

  game.anims.create({
    key: 'goomba-dead',
    frames: [{ key: 'goomba', frame: 2 }]
  })

  game.anims.create({
    key: 'misteryblock',
    frames: game.anims.generateFrameNumbers(
      'misteryBlock',
      { start: 0, end: 2 }
    ),
    frameRate: 1,
    repeat: -1
  })
}