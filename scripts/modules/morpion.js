export class Morpion {
  constructor(grid) {
    this.grid = grid;
    this.currentPlayer = 'X';
    this.winner = null;
    this.scoreX = 0;
    this.scoreO = 0;

    this.init();
  }

  updateScore() {
    const playerOne = document.getElementById("playerOne");
    const playerTwo = document.getElementById("playerTwo");
    playerOne.innerHTML = this.scoreX;
    playerTwo.innerHTML = this.scoreO;
  }


  init() {
    // Ajoutez un événement de clic sur chaque cellule
    const cells = this.grid.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        this.play(cell);
      });
    });

    // Ajoutez un écouteur d'événements de clic sur le bouton "Rejouer"
    const replayBtn = document.querySelector('#replay');
    replayBtn.addEventListener('click', () => {
      this.reset();
    });
  }



  play(cell) {
    // Si la cellule est vide et qu'il n'y a pas encore de gagnant, mettez à jour la grille et vérifiez si quelqu'un a gagné
    if (!cell.textContent && !this.winner) {
      cell.textContent = this.currentPlayer;
      this.checkWin();
      this.isTie();
      this.switchPlayer();
    }
  }

  switchPlayer() {
    // Changez le joueur actuel
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    const currentPlayerEl = document.querySelector('#currentPlayer');
    currentPlayerEl.textContent = `Joueur ${this.currentPlayer}`;
  }

  checkWin() {
    // Vérifiez s'il y a une victoire en parcourant toutes les combinaisons possibles de victoire
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const cells = this.grid.querySelectorAll('.cell');

      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[b].textContent === cells[c].textContent
      ) {
        this.winner = this.currentPlayer;
        this.currentPlayer === 'X' ? this.scoreX++ : this.scoreO++;
        this.showWinMessage();
        break;
      }
    }
  }

  showWinMessage() {
    // Affichez le message de victoire avec le nom du joueur gagnant
    document.getElementById("grid").classList.add("won");
    const winDisplay = document.querySelector(".win-display");
    winDisplay.innerHTML = `Joueur ${this.winner} a gagné !`;
    this.updateScore();
  }

  isTie() {
    const cells = this.grid.querySelectorAll('.cell');
    let isTie = true;

    cells.forEach((cell) => {
      if (!cell.textContent) {
        isTie = false;
      }
    });

    if (isTie) {
      this.showTieMessage();
    }
  }

  showTieMessage() {
    //Afficher le message de match nul
    document.getElementById("grid").classList.add("won");
    const winDisplay = document.querySelector(".win-display");
    winDisplay.innerHTML = `Match nul !`;
  }


  reset() {
    // Remettez la grille à son état initial
    document.getElementById("grid").classList.remove("won");
    const cells = this.grid.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.textContent = '';
    });

    const currentPlayerEl = document.querySelector('#currentPlayer');
    currentPlayerEl.textContent = 'Joueur X';

    const winDisplay = this.grid.querySelector('.win-display');
    winDisplay.classList.remove('show');

    this.currentPlayer = 'X';
    this.winner = null;
  }
}


