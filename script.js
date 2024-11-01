const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();
        togglePlayer();
    }
};

const togglePlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const checkResult = () => {
    let roundWon = false;

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (!board.includes("")) {
        statusText.textContent = "It's a tie!";
        isGameActive = false;
    }
};

const resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
};

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
statusText.textContent = `Player ${currentPlayer}'s turn`;
