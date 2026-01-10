const character = document.getElementById("hero");
const block = document.getElementById("blocks");
const blocks2 = document.getElementById("blocks2");
const blocks3 = document.getElementById("blocks3");
const blocks4 = document.getElementById("blocks4");
const highScore = document.getElementById("top-score");

const sonMort = document.getElementById("sonMort");
const sonBouge = document.getElementById("sonBouge");

const TIMER = document.getElementById("safeTimerDisplay");

const themeJeu = document.getElementById("themeJeu");

let themeEnCours = false;

let lost = true;
let seconds = 0;


let gameOverShown = false;
let isGameOver = false;

// IMPORTANT: garder les IDs des intervals pour pouvoir les arrêter
let collisionIntervalId = null;
let timerIntervalId = null;

function lancerTheme() {
  if (themeEnCours) return;

  themeJeu.currentTime = 0;
  themeJeu.play().catch(() => {
  });
  themeEnCours = true;
}

function arreterTheme() {
  themeJeu.pause();
  themeJeu.currentTime = 0;
  themeEnCours = false;
}


function playSound(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play().catch(() => {
    // ignore si bloqué (sécurité navigateur)
  });
}


function GoRight() {
  if (lost) {
    lost = false;
    
  }

  const posH = character.offsetLeft;
  if (posH < 440){
    character.style.left = (posH + 110) + 'px';
    playSound(sonBouge);
  }
  if (posH==440){ 
    character.style.left = (0) + 'px';
    playSound(sonBouge);
  }
}

function GoLeft() {
  if (lost) {
    lost = false;
    
  } 
  const posH = character.offsetLeft;
  if (posH > 0) {
    character.style.left = (posH - 110) + 'px';
    playSound(sonBouge);
  }
  if (posH==0){
    character.style.left = (440) + 'px';
    playSound(sonBouge);
  }
  
}


// Mise à jour du meilleur score
function UpdateHighScore(scoreFinal) {
  const current = parseInt(TIMER.innerText);
  
  // Récupérer la liste des scores
  let scores = JSON.parse(localStorage.getItem('Scores Hard')) || [];
  
  // Ajouter le nouveau score
  scores.push(current);
  
  // Trier du plus grand au plus petit
  scores.sort((a, b) => b - a);
  
  // Garder seulement le top 5
  scores = scores.slice(0, 5);
  
  // Sauvegarder
  localStorage.setItem('Scores Hard', JSON.stringify(scores));
  
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
  const lanes = [0, 110, 220,330,440];
  const lanesblock = lanes[Math.floor(Math.random() * lanes.length)]
  const lanesblock2 = lanes[Math.floor(Math.random() * lanes.length)]
  const lanesblock3 = lanes[Math.floor(Math.random() * lanes.length)]
  const lanesblock4 = lanes[Math.floor(Math.random() * lanes.length)]

  //block
  block.style.left = lanesblock + 'px';

  //blocks2blocks3.styl
  if (lanesblock2!=lanesblock) {
    blocks2.style.left = lanesblock2 + 'px';
}
else {
    blocks2.style.left = -110 + 'px';
}

  //block3 50% apparition
  const apparition = Math.random();

    if (lanesblock3!=lanesblock && lanesblock3!=lanesblock2)  {
      blocks3.style.left = lanesblock3 + 'px';
    }
    else {
    blocks3.style.left = -110 + 'px';
}


  //block4 
  if (lanesblock4!=lanesblock && lanesblock4!=lanesblock2 && lanesblock4!=lanesblock3)  {
      blocks4.style.left = lanesblock4 + 'px';
    }
    else {
    blocks4.style.left = -110 + 'px';
}
}

//full gauche <=> full droite

// Vérification collision
collisionIntervalId = setInterval(function() {
  if (lost || isGameOver) return;
  let heroPosition = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
  let blockPosition =parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  let blockTop =parseInt(window.getComputedStyle(block).getPropertyValue('top'));

  //block2
  let block2Position =parseInt(window.getComputedStyle(blocks2).getPropertyValue('left'));
  let block2Top =parseInt(window.getComputedStyle(blocks2).getPropertyValue('top'));

  //block3
  let block3Position =parseInt(window.getComputedStyle(blocks3).getPropertyValue('left'));
  let block3Top =parseInt(window.getComputedStyle(blocks3).getPropertyValue('top'));

  //block4
  let block4Position =parseInt(window.getComputedStyle(blocks4).getPropertyValue('left'));
  let block4Top =parseInt(window.getComputedStyle(blocks4).getPropertyValue('top'));


  // Zone de collision 
  //block1
  if (heroPosition === blockPosition && blockTop > 300 && blockTop < 530) {
    lost = true;
    UpdateHighScore();
    TIMER.innerText = '0';
    seconds = 0;
    character.style.left = '220px'; // reset au centre
    FinDePartie();
    playSound(sonMort);
  }

  //block2
  if (heroPosition === block2Position && block2Top > 350 && block2Top < 530) {
    lost = true;
    UpdateHighScore();
    FinDePartie();
    playSound(sonMort);
    TIMER.innerText = '0';
    seconds = 0;
    character.style.left = '220px'; // reset au centre
  
  }

  if (heroPosition === block3Position && block3Top > 200 && block3Top < 530) {
    lost = true;
     UpdateHighScore();
    TIMER.innerText = '0';
    seconds = 0;
    character.style.left = '220px'; // reset au centre
    FinDePartie();
    playSound(sonMort);
  }

  if (heroPosition === block4Position && block4Top > 300 && block4Top < 530) {
    lost = true;
    UpdateHighScore();
    TIMER.innerText = '0';
    seconds = 0;
    character.style.left = '220px'; // reset au centre
    FinDePartie();
    playSound(sonMort);
    
  }
}, 50);
// utilisation d'innerhtml comme vu dans le cours page 13 afin de varier et plus pratique avec la mort + timer

function timer() {
  if (timerIntervalId) return;
  timerIntervalId = setInterval(function() {
    if (isGameOver) return;
    document.getElementById("safeTimerDisplay").innerHTML = seconds;
    seconds++;
  }, 1000);
}


timer();



// Chargement initial du high score
window.addEventListener('load', InitHS);


function InitHS() {
  const scores = JSON.parse(localStorage.getItem('Scores Hard')) || [];
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
// implementation du score afficher sur le popupdedefaite abandonner car inutile
function AfficherPopupDefaite() {
  AssurerPopupDefaite();
  const overlay = document.getElementById("death-overlay");
  if (overlay) overlay.classList.add("is-visible");
}

function MettreEnPauseAnimations() {
  [block, blocks2, blocks3, blocks4].forEach((el) => {
    if (!el) return;
    el.style.animationPlayState = 'paused';
  });
}

function FinDePartie() {
  if (gameOverShown) return;
  arreterTheme();
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
  AfficherPopupDefaite();
}

window.addEventListener("load", () => {
  const demarrerAudio = () => {
    if (!isGameOver && !themeEnCours) {
      lancerTheme();
    }

    // Une seule fois
    document.removeEventListener("keydown", demarrerAudio);
    document.removeEventListener("mousedown", demarrerAudio);
    document.removeEventListener("touchstart", demarrerAudio);
  };

  // Attente interaction utilisateur (règle navigateur)
  document.addEventListener("keydown", demarrerAudio);
  document.addEventListener("mousedown", demarrerAudio);
  document.addEventListener("touchstart", demarrerAudio);
});

