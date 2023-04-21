const gameBoard = document.querySelector("#gameboard");
const infodisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];

let turn = "circle";
infodisplay.textContent = "Circle Goes First";

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        {
        /* cellElement.id = index siogns an id for each square */
        }
        cellElement.id = index;
        cellElement.addEventListener("click", addGo);
        gameBoard.append(cellElement);
    });
}
createBoard();

function addGo(e) {
const goDisplay = document.createElement("div");
    goDisplay.classList.add(turn);
    e.target.append(goDisplay);
    turn = turn === "circle" ? "cross" : "circle";
    {
        /* if turn is circle cross next if not circle is next :) */
    }
    infodisplay.textContent = "It is Now " + turn + " Turn";
    e.target.removeEventListener("click", addGo);
    checkScore();
}

function checkScore() {
const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    winningCombos.forEach((array) => {
        let circleWins = array.every((cell) =>
        allSquares[cell].firstChild?.classList.contains("circle")
        );
        if(circleWins) {
            infodisplay.textContent = "circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    });

    winningCombos.forEach((array) => {
        let crossWins = array.every((cell) =>
        allSquares[cell].firstChild?.classList.contains("cross")
        );
        if(crossWins) {
            infodisplay.textContent = "cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    });

    

}

function resetGame() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        if (square.firstChild) {
            square.removeChild(square.firstChild);
        }
        square.addEventListener("click", addGo);
    });
    turn = "circle";
    infodisplay.textContent = "Circle Goes First";
}

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGame);