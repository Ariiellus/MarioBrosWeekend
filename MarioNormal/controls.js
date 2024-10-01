export function checkControls ({ mario, keys }) {
  const marioFloor = mario.body.touching.down

  const leftKey = keys.left.isDown
  const rightKey = keys.right.isDown
  const upKey = keys.up.isDown
  const downKey = keys.down.isDown

  if (mario.isDead) return

  if (leftKey) {
    marioFloor && mario.anims.play('mario-walk', true)
    mario.x -= 2
    mario.flipX = true
  } else if (rightKey) {
    marioFloor && mario.anims.play('mario-walk', true)
    mario.x += 2
    mario.flipX = false
  } else if (marioFloor) {
    mario.anims.play('mario-idle', true)
  }

  if (upKey && marioFloor) {
    mario.setVelocityY(-300)
    mario.anims.play('mario-jump', true)
  }
}
