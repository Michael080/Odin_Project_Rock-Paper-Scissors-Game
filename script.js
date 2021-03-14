let weapon = ['Rock', 'Paper', 'Scissors'];

let playerScore = 0;
let computerScore = 0;

const weaponsMatchUp = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
}

function Player(score, name, weapon) {
  this.score = score;
  this.name = name;
  this.weapon = weapon;

  this.winner = () => this.score ++;
}

let playerObj = new Player(0, 'Player-1');
let computerObj = new Player(0, 'HAL');

function cpuWeaponSelect() {
    random_weapon = Math.floor(Math.random() * 3);
    return weapon[random_weapon].toLowerCase();
}

function scoreBoard(winWeapon, loseWeapon, draw = false){
    const winLoseMatch = `>> ${winWeapon.toUpperCase()} beats ${loseWeapon.toUpperCase()}`;
    const drawMatch = `It's a draw.`

    // Log match results & score
    console.clear();

    draw ? console.log(drawMatch) : console.log(winLoseMatch);
    console.log('...');
    console.log(`You: ${playerObj.score} vs. CPU: ${computerObj.score}`);
}

// Pass winner obj. & increment score 1 point
// Pass prop. - currentRound & display corresponding message
// winFunc(playerObj.score, playerObj.currentRound, 'draw') 
function winFunc(winnerScore, outcome) {
  const outcomes = {
    win: () => {
      playerObj.winner();
      scoreBoard(playerObj.weapon, computerObj.weapon);
    },
    draw: () => {
      scoreBoard(playerObj.weapon, computerObj.weapon, true);
    },
    lose: () => {
      computerObj.winner();
      scoreBoard(computerObj.weapon, playerObj.weapon);
    }
  }

  return outcomes[outcome]();
}

function matchUp(playerSelection, computerSelection) {
    // Id win-condition for players
    playerObj.beats = weaponsMatchUp[playerObj.weapon];
    computerObj.beats = weaponsMatchUp[computerObj.weapon];

    playerObj.beats === computerObj.weapon ?
      // win condition:
      winFunc(playerObj.score, 'win') :
      computerObj.beats === playerObj.weapon ?
        // lose condition:
        winFunc(computerObj.score, 'lose') :
        // draw condition:
        winFunc(playerObj.score, 'draw'); 
}

function playRounds(rounds) {
    for (i = 0; i < rounds; i++) {
        playerObj.weapon = prompt('Choose your weapon:').toLowerCase();;
        computerObj.weapon = cpuWeaponSelect();
        matchUp(playerObj.weapon, computerObj.weapon);
    }
}

playRounds(5);