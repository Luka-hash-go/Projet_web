const character = document.getElementById("hero");
const block = document.getElementById("blocks");
const block2 = document.getElementById("blocks2");
const highScore = document.getElementById("top-score");

const sonMort = document.getElementById("sonMort");
const sonBouge = document.getElementById("sonBouge");


const TIMER = document.getElementById("safeTimerDisplay");

let lost = true;
let seconds = 0;

let gameOverShown = false;
let isGameOver = false;

let collisionIntervalId = null;
let timerIntervalId = null;

function playSound(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play().catch(() => {
    // ignore si bloqué (sécurité navigateur)
  });
}

// Nouvelles fonctions simples pour bouger
function GoRight() {
  if (lost) {
    lost = false;
    playSound(sonMort);
  }

  const posH = character.offsetLeft;
  if (posH < 220){
    character.style.left = (posH + 110) + 'px';
    playSound(sonBouge);
  }
}

function GoLeft() {
  if (lost) {
    lost = false;
    playSound(sonMort);
  } 
  const posH = character.offsetLeft;
  if (posH > 0) {
    character.style.left = (posH - 110) + 'px';
    playSound(sonBouge);
  }
}



// Mise à jour du meilleur score
function UpdateHighScore() {
  const current = parseInt(TIMER.innerText);
  
  // Récupérer la liste des scores
  let scores = JSON.parse(localStorage.getItem('Scores Easy')) || [];
  
  // Ajouter le nouveau score
  scores.push(current);
  
  // Trier du plus grand au plus petit
  scores.sort((a, b) => b - a);
  
  // Garder seulement le top 5
  scores = scores.slice(0, 5);
  
  // Sauvegarder
  localStorage.setItem('Scores Easy', JSON.stringify(scores));
  
  // Mettre à jour l'affichage du meilleur score actuel
  highScore.innerText = scores[0];
}



window.addEventListener("keydown", Mouvement);
// Fonction dédiée à gérer le clavier
function Mouvement(e) {
  if (isGameOver) return;
  switch (e.key) {
    case "ArrowRight":
    case "d" :
      GoRight();
      break;

    case "ArrowLeft":
    case "q":
      GoLeft();
      break;
  }
}


// Changement de voie du block
block.addEventListener('animationiteration', BlockMouvement);

function BlockMouvement() { 
  //On trouve la ligne et on mets le block sur la ligne
  const lanes = [0, 110, 220];
  const lanesblock = lanes[Math.floor(Math.random() * lanes.length)]
  block.style.left = lanesblock + 'px';

  //On mets 50% du temps block2 et si ligne diff alors apparition block2
  const apparition = Math.random();
  if (apparition>0.5) {
    block2.style.left = -110 + 'px';
  }
  if (apparition<0.5) {
    const lanesblock2 = lanes[Math.floor(Math.random() * lanes.length)]
    if (lanesblock2!=lanesblock) {
      block2.style.left = lanesblock2 + 'px';
    }
    
  }

}



// Vérification collision
collisionIntervalId = setInterval(function() {
  if (lost || isGameOver) return;
  let heroPosition = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
  let blockPosition =parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  let blockTop =parseInt(window.getComputedStyle(block).getPropertyValue('top'));

  //block2
  let block2Position =parseInt(window.getComputedStyle(block2).getPropertyValue('left'));
  let block2Top =parseInt(window.getComputedStyle(block2).getPropertyValue('top'));

  // Zone de collision 
  //block1
  if (heroPosition === blockPosition && blockTop > 300 && blockTop < 530) {
    lost = true;
    UpdateHighScore();
    TIMER.innerText = '0';
    seconds = 0;
    character.style.left = '110px'; // reset au centre
    DeclencherGameOver(seconds);
  }

  //block2
  if (heroPosition === block2Position && block2Top > 350 && blockTop < 530) {
    lost = true;
    UpdateHighScore();
    TIMER.innerText = '0';
    seconds = 0;
    character.style.left = '110px'; // reset au centre
    DeclencherGameOver(seconds);
  }
}, 50);




// Chargement initial du high score
window.addEventListener('load', InitHS);


function timer() {
  if (timerIntervalId) return;
  timerIntervalId = setInterval(function() {
    if (isGameOver) return;
    document.getElementById("safeTimerDisplay").innerHTML = seconds;
    seconds++;
  }, 1000);
}


timer();

function InitHS() {
  const scores = JSON.parse(localStorage.getItem('Scores Easy')) || [];
  if (scores.length === 0) {
    highScore.innerText = '0';
  } else {
    highScore.innerText = scores[0];
  }
}

function AssurerPopupDefaite() {
  if (document.getElementById("death-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "death-overlay";

  const modal = document.createElement("div");
  modal.className = "death-modal";

  modal.innerHTML = `
    <h2 class="death-title">Vous avez perdu</h2>
    <button id="btn-replay" class="button-23" type="button">Rejouer</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById("btn-replay").addEventListener("click", () => {
    location.reload();
  });
}

function AfficherPopupDefaite() {
  AssurerPopupDefaite();
  const overlay = document.getElementById("death-overlay");
  if (overlay) overlay.classList.add("is-visible");
}

function MettreEnPauseAnimations() {
  [block, block2].forEach((el) => {
    if (!el) return;
    el.style.animationPlayState = 'paused';
  });
}

function FinDePartie(finalScore) {
  if (gameOverShown) return;
  gameOverShown = true;
  isGameOver = true;
  lost = true;

  if (collisionIntervalId) {
    clearInterval(collisionIntervalId);
    collisionIntervalId = null;
  }
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }

  MettreEnPauseAnimations();
  UpdateHighScore(Number(finalScore) || 0);
  AfficherPopupDefaite();
}

function DeclencherGameOver(score) {
  FinDePartie(score);
}


// Mise à jour du meilleur score
