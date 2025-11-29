const character = document.getElementById("hero");
const block = document.getElementById("blocks");
const blocks2 = document.getElementById("blocks2");
const blocks3 = document.getElementById("blocks3");
const blocks4 = document.getElementById("blocks4");
const score = document.getElementById("score");
const highScore = document.getElementById("top-score");

let lost = true;

// Nouvelles fonctions simples pour bouger
function GoRight() {
  if (lost) {
    lost = false;
  }

  const posH = character.offsetLeft;
  if (posH < 440){
    character.style.left = (posH + 110) + 'px';
  }
  if (posH==440){ 
    character.style.left = (0) + 'px';
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
  if (posH==0){
    character.style.left = (440) + 'px';
  } 
}

// Mise à jour du meilleur score
function UpdateHighScore() {
  const current = parseInt(score.innerText);
  const best = parseInt(highScore.innerText);
  if (current > best) {
    localStorage.setItem('High Score', current);
    highScore.innerText = current;
  }
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

  if (!lost){
    score.innerText = (parseInt(score.innerText) + 1);
  }
}

//full gauche <=> full droite

// Vérification collision
setInterval(function() {
  if (lost) return;
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
    score.innerText = '0';
    character.style.left = '220px'; // reset au centre
  }

  //block2
  if (heroPosition === block2Position && block2Top > 350 && block2Top < 530) {
    lost = true;
    UpdateHighScore();
    score.innerText = '0';
    character.style.left = '220px'; // reset au centre
  }

  if (heroPosition === block3Position && block3Top > 200 && block3Top < 530) {
    lost = true;
    UpdateHighScore();
    score.innerText = '0';
    character.style.left = '220px'; // reset au centre
  }

  if (heroPosition === block4Position && block4Top > 300 && block4Top < 530) {
    lost = true;
    UpdateHighScore();
    score.innerText = '0';
    character.style.left = '220px'; // reset au centre
  }
}, 50);




// Chargement initial du high score
window.addEventListener('load', InitHS);

function InitHS() {
  const saved = localStorage.getItem('High Score');
  if (!saved) localStorage.setItem('High Score', '0');
  highScore.innerText = localStorage.getItem('High Score');
}