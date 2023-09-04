// Importez la classe Morpion depuis le fichier 'morpion.js'
import { Morpion } from "./modules/morpion.js";

// Créez une instance de Morpion et passez-lui l'élément DOM correspondant à la grille
const morpion = new Morpion(document.querySelector('#grid'));

let currentPlayer = 'X';

// Ajoutez un écouteur d'événements de clic sur chaque cellule
const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    // Vérifiez si la cellule est vide avant de la remplir
    if (!cell.textContent) {
      cell.textContent = currentPlayer;
      // Changez le joueur actuel
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

