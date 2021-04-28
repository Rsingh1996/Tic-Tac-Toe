
const statusDisplay = document.querySelector(".game-status");

let gameActive = true;

let currentPlayer = "X";
let playerX = 0;
let playerO =0;
let tie = 0;
    
let gameState = ["", "", "", "", "", "", "", "", ""];

function winningMessage () {
   return "Player " + currentPlayer + " has won!";
   
}
function drawMessage () {
    return "Game ended in a draw!";
   
}
function currentPlayerTurn () {
    return "It's " +currentPlayer+ "'s turn";
}
statusDisplay.innerHTML = currentPlayerTurn();


document.querySelectorAll(".box").forEach(box => box.addEventListener("click", handleBoxClick));
document.querySelector(".game-restart").addEventListener("click", handleRestartGame);

function handleBoxClick(clickedBoxEvent) {
     
        const clickedBox = clickedBoxEvent.target;
    
        const clickedBoxIndex = parseInt(
          clickedBox.getAttribute("id")
        );
   
        if (gameState[clickedBoxIndex] !== "" || !gameActive) {
            return;
        }
        playSound("click1");
        handleBoxPlayed(clickedBox, clickedBoxIndex);
        handleResultValidation();
    }

    function handleBoxPlayed(clickedBox, clickedBoxIndex) {

            gameState[clickedBoxIndex] = currentPlayer;
            clickedBox.innerHTML = currentPlayer;
        }

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                if (a === "" || b === "" || c === "") {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break
                }
            }
        if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                if(currentPlayer==="X") {
                    playerX++;
                    document.querySelector(".score-X").innerText=playerX;
                    playSound( "win");
                   }
                   else {
                       playerO++;
                       document.querySelector(".score-O").innerText=playerO;
                       playSound("win1");
                   }
                
                gameActive = false;
                return;
            }
        
            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = drawMessage();
                tie++;
                document.querySelector(".tie").innerText=tie;
                playSound("draw");
                gameActive = false;
                return;
            }
       
            handlePlayerChange();
        }
        function handlePlayerChange() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = currentPlayerTurn();
        }

        function handleRestartGame() {
            gameActive = true;
            currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll(".box")
                       .forEach(box => box.innerHTML = "");
        }

        function playSound( tone) {
            var audio = new Audio("./sounds/"+tone+".wav");
            audio.play();}