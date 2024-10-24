const INIT_SPRITESHEETS = [
  {
    key: 'mario',
    path: '/assets/entities/mario.png',
    frameConfig: {
      frameWidth: 18,
      frameHeight: 16
    }
  },
  {
    key: 'goomba',
    path: '/assets/entities/overworld/goomba.png',
    frameConfig: {
      frameWidth: 16,
      frameHeight: 16
    }
  },
  {
    key: 'misteryBlock',
    path: '/assets/blocks/overworld/misteryBlock.png',
    frameConfig: {
      frameWidth: 16,
      frameHeight: 16
    }
  },
  {
    key: 'coin',
    path: '/assets/collectibles/coin.png',
    frameConfig: {
      frameWidth: 16,
      frameHeight: 16
    }

  }
]
export const initSpritesheet = ({ load }) => {
  INIT_SPRITESHEETS.forEach(({ key, path, frameConfig }) => {
    load.spritesheet(key, path, frameConfig)
  })
}