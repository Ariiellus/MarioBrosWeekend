const preloadAudio = [
  {
    key: 'gameover',
    path: '/assets/sound/music/gameover.mp3',
  },
  {
    key: 'goomba-stomp',
    path: '/assets/sound/effects/goomba-stomp.wav',
  },
  {
    key: 'coin-pickup',
    path: '/assets/sound/effects/coin.mp3',
  },
  {
    key: 'blockbump',
    path: '/assets/sound/effects/block-bump.wav',
  }
];

export const initAudio = ({ load }) => {
  preloadAudio.forEach(({ key, path}) => {
    load.audio(key, path)
  })
}

export const playAudio = (id, { sound }, { volume = 0.2 } = {}) => {
  try {
    return sound.add(id, { volume }).play();
  } catch (e) {
    return null;
  }
}