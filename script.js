let weapon = ['Rock', 'Paper', 'Scissors'];

let playerScore = 0;
let computerScore = 0;

function cpuWeaponSelect() {
    random_weapon = Math.floor(Math.random() * 3);
    return weapon[random_weapon].toLowerCase();
}

function scoreBoard(winWeapon, loseWeapon, point, win = false){
    point++;
    console.log('');
    console.log('----------------------------')
    console.log(`>> ${winWeapon} beats ${loseWeapon}`);
    console.log(`You: ${playerScore} vs. CPU: ${computerScore}`);
    win ? console.log('You win!'):
            console.log('You lose :(');
}

function matchUp(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        console.log('');
        console.log('----------------------------')
        console.log('Draw...');
        console.log(`You: ${playerScore} vs. CPU: ${computerScore}`);
    } else {
        switch (true) {
            case (playerSelection === 'rock' && computerSelection === 'scissors'):
            case (playerSelection === 'paper' && computerSelection === 'rock'):
            case (playerSelection === 'scissors' && computerSelection === 'paper'):
                scoreBoard(playerSelection, computerSelection, playerScore, true);
                break;
                default:
                    scoreBoard(computerSelection, playerSelection, computerScore);
        }
    }
}

function playRounds(rounds) {
    for (i = 0; i < rounds; i++) {
        var playerSelection = prompt('Choose your weapon:').toLowerCase();
        var computerSelection = cpuWeaponSelect();
        matchUp(playerSelection, computerSelection);
    }
}

playRounds(5);