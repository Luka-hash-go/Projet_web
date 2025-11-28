window.onload = () => {
  const whoosh = document.getElementById('whoosh');
  const blip = document.getElementById('blip');

  // Flash sonore
  setTimeout(() => {
    whoosh.play().catch(() => {});
  }, 250);

  // Petit "bip" Wii après logo
  setTimeout(() => {
    blip.play().catch(() => {});
  }, 1500);

  // Affiche ton jeu après l'intro
  setTimeout(() => {
    document.getElementById("gameContent").style.display = "block";
  }, 4000);
};
