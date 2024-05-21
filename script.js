const cells = document.querySelectorAll('.container div');
const message = document.getElementById('winnerMsg');
const start = document.getElementById('restartGame');


let gameStarted = false;
let state;
let nextPlayer;

let winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function clearBoard() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
}

function isGameOver() {

    for (let i = 0; i<winningStates.length; i++) {
        const x = winningStates[i][0];
        const y = winningStates[i][1];
        const z = winningStates[i][2];

        if ( state[x] !== '' && state[x] === state[y] && state[y] === state[z] ) {
            message.textContent = nextPlayer + " has won the game";
            return true;
        }
    }

    for (let i = 0; i < state.length; i++) {
        if (state[i] == '') { 
            return false;
        }
    }
    
    message.textContent = 'Game Drawn'
    return true;    
}

function onCellClick(index) {
    if (gameStarted === false) {
        alert("You have to click on start button to play");
        return;
    }
    if (state[index] !== '') {
        alert("box is already cheked");
        return;
    }
    state[index] = nextPlayer;
    cells[index].textContent = nextPlayer;

    if (isGameOver()) {
        gameStarted = false;
        return;
    }
    changePlayer();
    displayNextPlayer();
};

function startGame() {
    gameStarted = true;
    state = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]
    nextPlayer = 'X';

    clearBoard();
    displayNextPlayer();
};

start.addEventListener('click', startGame);

function displayNextPlayer() {
    message.textContent = 'Next turn player :' + nextPlayer
};

cells.forEach(
    function (cell, index) {
        cell.addEventListener('click', function () {
            onCellClick(index);
        })
    }
)

function changePlayer() {
    if (nextPlayer === 'X') {
        nextPlayer = 'O'
    }
    else {
        nextPlayer = 'X';
    }
}