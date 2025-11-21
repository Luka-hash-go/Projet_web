const character = document.getElementById("hero");
const block = document.getElementById("blocks");
const score = document.getElementById("score");
const highScore = document.getElementById("top-score");

let lost = true;

// Nouvelles fonctions simples pour bouger
function goRight() {
  if (lost) {
    lost = false;
  }
  const posH = character.offsetLeft;
  if (posH < 220){
     character.style.left = (posH + 110) + 'px';
  } character.style.left = (posH + 110) + 'px';
}

function goLeft() {
  if (lost) {
    lost = false;
  } 
  const posH = character.offsetLeft;
  if (posH > 0) {
    character.style.left = (posH - 110) + 'px';
  }
}

// Mise à jour du meilleur score
function updateHighScore() {
  const current = parseInt(score.innerText);
  const best = parseInt(highScore.innerText);
  if (current > best) {
    localStorage.setItem('High Score', current);
    highScore.innerText = current;
  }
}


window.addEventListener('keydown', Mouvement);
// Fonction dédiée à gérer le clavier
function Mouvement(e) {
  switch (e.key) {
    case 'ArrowRight':
      goRight();
      break;
    case 'ArrowLeft':
      goLeft();
      break;
  }
}


// Changement de voie du bloc
block.addEventListener('animationiteration', blockMouvement);
function blockMouvement() { 
  const lanes = [0, 110, 220];
  block.style.left = lanes[Math.floor(Math.random() * lanes.length)] + 'px';
  if (!lost){
    score.innerText = (parseInt(score.innerText) + 1);
  }
}



// Vérification collision
setInterval(function() {
  if (lost) return;
  let heroPosition = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
  let blockPosition =parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  let blockTop =parseInt(window.getComputedStyle(block).getPropertyValue('top'));

  // Zone de collision 
  if (heroPosition === blockPosition && blockTop > 420 && blockTop < 530) {
    lost = true;
    updateHighScore();
    score.innerText = '0';
    character.style.left = '110px'; // reset au centre
  }
}, 50);

// Chargement initial du high score
window.addEventListener('load', () => {
  const saved = localStorage.getItem('High Score');
  if (!saved) localStorage.setItem('High Score', '0');
  highScore.innerText = localStorage.getItem('High Score');
});
