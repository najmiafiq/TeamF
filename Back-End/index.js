restartButton.addEventListener('click', () => {
    gameOverElement.style.display = 'none'
    scoreElement.innerHTML = 0
    startSound.play()
    init()
    animate()
})
function handleStart() {
    startGameElem.style.display = 'none'
    gameScore.style.display = 'block'
    animate()
    startSound.play()
}

window.addEventListener('keypress', handleStart, { once: true})
addEventListener('keydown', ({ key }) => {
  if (game.over) return;
  switch (key) {
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
    case ' ':
      if (!keys.space.pressed) {
        keys.space.pressed = true;
        shootProjectile();
      }
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      break;
  }
});
addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
    case ' ':
      keys.space.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
  }
});
backgroundMusic.addEventListener('ended', function() {
    if (game.over = true) return
    this.currentTime = 0
    this.play()
})