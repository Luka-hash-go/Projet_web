const character = document.getElementById("hero");
const block = document.getElementById("blocks");
const block2 = document.getElementById("blocks2");
const highScore = document.getElementById("top-score");


const TIMER = document.getElementById("safeTimerDisplay");

let lost = true;
let seconds = 0;

// Nouvelles fonctions simples pour bouger
function GoRight() {
  if (lost) {
    lost = false;
  }

  const posH = character.offsetLeft;
  if (posH < 220){
    character.style.left = (posH + 110) + 'px';
  }
}

function GoLeft() {
  if (lost) {
    lost = false;
  } 
  const posH = character.offsetLeft;
  if (posH > 0) {
    character.style.left = (posH - 110) + 'px';
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
setInterval(function() {
  if (lost) return;
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
  }

  //block2
  if (heroPosition === block2Position && block2Top > 350 && blockTop < 530) {
    lost = true;
    UpdateHighScore();
    TIMER.innerText = '0';
    seconds = 0;
    character.style.left = '110px'; // reset au centre
  }
}, 50);




// Chargement initial du high score
window.addEventListener('load', InitHS);


function timer() {
  var timer = setInterval(
    function() {
    document.getElementById("safeTimerDisplay").innerHTML = seconds;
    seconds++;
    if (seconds < 0) {
      clearInterval(timer);
    }
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


// Mise à jour du meilleur score
