// Scoreboard
const playerScore = document.querySelector('.player-score');
const cpuScore = document.querySelector('.cpu-score');

// Player weapon options:
const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
// CPU weapon selection:
const cpuWeaponDisplay = document.querySelector('.weapon-cpu');
const cpuDefaultWeaponDisplay = 'cpu';

// Player prompt:
const playerPrompt = document.querySelector('.prompt');
const playerWeaponsList = document.querySelectorAll('.weapon');

const prompts = {
  actions: {
    startGame: 'Click Screen To Start New Game',
    selectWeapon: 'Select your weapon!',
    clickScreen: 'Click Screen To Play Next Round'
  },
  
  match: {
    drawMatch: `It's a draw.`,
    winMatch: 'You have successfully defeated your foe!!!',
    loseMatch: 'Bested by randomized selection...'
  }
}

// Weapons for CPU weapon selection:
let weapon = ['Rock', 'Paper', 'Scissors'];

// Prop = weapon, value = what prop beats
const weaponsMatchUp = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
}

// Player object
function Player(score, name, weapon, firstRound) {
  this.score = score;
  this.name = name;
  this.weapon = weapon;
  this.firstRound = false;

  this.winner = () => this.score ++;
  this.setWeaponDOM = (value) => {
    const weapons = {
      rock: rock,
      paper: paper,
      scissors: scissors
    }

    this.weaponDOM = weapons[value];
  }
}

// Instantiate Player objects for player/cpu
let playerObj = new Player(0, 'Player-1');
let computerObj = new Player(0, 'HAL');

// Store event listeners
const listeners = {};

function displayPrompt (bool, message) {
  playerPrompt.textContent = message;

  if (bool === true) {
    playerPrompt.classList.remove('hidden');
  } else {
    playerPrompt.classList.add('hidden');
  }
}

function cpuWeaponSelect() {
    random_weapon = Math.floor(Math.random() * 3);
    return weapon[random_weapon].toLowerCase();
}

// let firstRound = false;
function scoreBoard(winWeapon, loseWeapon, draw = false){
  const winLoseMatch = `>> ${winWeapon.toUpperCase()} beats ${loseWeapon.toUpperCase()}`;

  playerObj.weapon === computerObj.weapon ?
    draw = true : draw = false;

  draw === true ? 
    displayPrompt(true, prompts.match.drawMatch) :
    displayPrompt(true, winLoseMatch);

  if (draw === true) {
    return displayPrompt(true, prompts.match.drawMatch);
  }

  // Update scoreboard
  playerScore.textContent = playerObj.score;
  cpuScore.textContent = computerObj.score;

  // Announce winner
  if (playerObj.score === 5 || computerObj.score === 5) {
    // check match outcome and display message
    playerObj.score > computerObj.score ?
      displayPrompt(true, prompts.match.winMatch) :
      displayPrompt(true, prompts.match.loseMatch);
  } 
  
  // remove event-listener
  if (playerObj.firstRound === true && !listeners.clearInitialScreen.cleared) {
    listeners.clearInitialScreen.cleared = true;
    window.removeEventListener('click', listeners.clearInitialScreen.func);  
  } 
}

// Pass winner obj. & increment score 1 point
// Pass prop. - currentRound & display corresponding message
// winFunc(playerObj.score, playerObj.currentRound, 'draw') 
function winFunc(winnerScore, outcome) {
  const outcomes = {
    win: () => {
      playerObj.firstRound = true;
      playerObj.winner();
      scoreBoard(playerObj.weapon, computerObj.weapon);
    },
    draw: () => {
      playerObj.firstRound = true;
      scoreBoard(playerObj.weapon, computerObj.weapon, true);
    },
    lose: () => {
      playerObj.firstRound = true;
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

function playRounds(rounds, playerWeapon, cpuWeapon) {
  for (i = 0; i < rounds; i++) {
    matchUp(playerObj.weapon, computerObj.weapon);
  }
}

function selectWeapons(event) {
  playerObj.firstRound = true;
  // PLAYER:
  // Remove .revert-select styling from previous selection
  playerObj.weaponDOM ? 
    playerObj.weaponDOM.classList.remove('revert-select') : 
    'next';
  playerObj.weapon = event.target.id;
  playerObj.setWeaponDOM(playerObj.weapon);
  event.currentTarget.classList.add('revert-select');
  // CPU:
  computerObj.weapon = cpuWeaponSelect();
  cpuWeaponDisplay.textContent = computerObj.weapon; // display cpu selection

  if (playerObj.score < 5 && computerObj.score < 5) {
    playRounds(1, playerObj.weapon, computerObj.weapon);
  } 
}

function addEventListenersList(list, event, fn, bool) {
  if (bool) {
    for (let item of list) {
      item.addEventListener(event, fn);
    }
  } else {
    for (let item of list) {
      item.removeEventListener(event, fn);
    }
  }
}

// Add listeners to 'buttons'
function addWeaponListeners(bool) {
  playerPrompt.classList.add('flash-text');
      addEventListenersList(playerWeaponsList, 'click', selectWeapons, bool);
}

//  * initial round
function test(func) {
  document.removeEventListener('click', func);
}

function addClassToList(list) {
  for (let item of list) {
    item.classList.add('weapon-hover');
  }
}

function initiateGame() {
  function initialScreen() {
    clearInterval(flashGameStart);
    playerPrompt.classList.remove('flash-text');
    // Make sure text is visible after 'flash-text'
    playerPrompt.style.color = 'black'; 
    displayPrompt(true, prompts.actions.selectWeapon);
  }

  listeners.clearInitialScreen = {
    func: function clearInitialScreen() {
      if (playerObj.firstRound !== true) {
        // Stop flashing-text:
        clearInterval(flashGameStart); 
        playerPrompt.classList.remove('flash-text');
        playerPrompt.style.color = 'black';
        displayPrompt(true, prompts.actions.selectWeapon); // change prompt
        addWeaponListeners(true); // add listeners to 'buttons'
        addClassToList(playerWeaponsList); // add class for hover-state
      }
    },
    cleared: false
  }

  displayPrompt(true, prompts.actions.startGame);
  const flashGameStart = setInterval(() => {playerPrompt.classList.toggle('flash-text')}, 500);

  // save to listeners
  listeners.clearInitialScreen.listener = window.addEventListener('click', listeners.clearInitialScreen.func);

  if (playerObj.firstRound === true) {
    return window.removeEventListener('click', clearInitialScreen);
  }
}

initiateGame();

// playRounds(5);