const GLOBAL = function(){
    const log = console.log;

    const endGameDialog = document.querySelector(".end-game");
    const endGameMessage = document.querySelector(".end-game p");
    const resetGameButton = document.querySelector(".end-game button");
    const invalidSquareDialog = document.querySelector(".invalid-square");
    const invalidSquareMessage = document.querySelector(".invalid-square p");
    const invalidConfirmButton = document.querySelector(".invalid-square button");
    const textDisplay = document.querySelector(".text-display");
    const boardDisplay = document.querySelector(".board");
    

    resetGameButton.addEventListener("click", () => {
        screen.newGame();
    })

    function Gameboard() {
        const rows = 3;
        const columns = 3;
        const board = [];

        for (let i = 0; i < rows; ++i) {
            board[i] = [];
            for (let j = 0; j < columns; ++j) {
                board[i].push(Square());
            }
        }

        function getBoard() { 
            return board;
        }

        function checkSquareAvailability(row, column) {
            if (!board[row][column].getValue()) {
                return true;
            } else {
                return false;
            }
        }

        function placeMarker(row, column, naughtOrCross) {
            const targetSquare = board[row][column];
            targetSquare.setValue(naughtOrCross);
        }

        function printBoard() {
            board.map((row) => {
                log(row.map((square) => {
                    return square.getValue();
                }))
            })
        }

        function checkForWinner() {
            let winner = false;

            for (const row of board) {
                if (row[0].getValue() &&
                    row[0].getValue() === row[1].getValue() &&
                    row[1].getValue() === row[2].getValue()) 
                {
                    log(row[0].getValue(), row[1].getValue(), row[2].getValue());
                    winner = row[0].getValue();
                    log("won by row");
                    break;
                }
            }

            if (!winner) {
                for (let i = 0; i < board[0].length; ++i) {
                    if (board[0][i].getValue() &&
                        board[0][i].getValue() === board[1][i].getValue() &&
                        board[1][i].getValue() === board[2][i].getValue()) 
                        {
                            winner = board[0][i].getValue();
                            log(board[0][i].getValue(), board[1][i].getValue(), board[2][i].getValue());
                            log("won by col");
                            break;
                    }
                }
            }

            if (!winner) {
                if (board[0][0].getValue() &&
                    board[0][0].getValue() === board[1][1].getValue() &&
                    board[1][1].getValue() === board[2][2].getValue())
                    {
                        winner = board[0][0].getValue();
                        log(board[0][0].getValue(), board[1][1].getValue(), board[2][2].getValue());
                        log("won by diag1");
                    }                
            }

            if (!winner) {
                if (board[0][2].getValue() &&
                    board[0][2].getValue() === board[1][1].getValue() &&
                    board[1][1].getValue() === board[2][0].getValue())
                    {
                        winner = board[0][2].getValue();
                        log(board[0][2].getValue(), board[1][1].getValue(), board[2][0].getValue());
                        log("won by diag2");
                    }
            }


            log(winner);
            return winner;
        }

        return {
            getBoard,
            placeMarker,
            printBoard,
            checkForWinner,
            checkSquareAvailability
        };
    }

    function Square() {
        let value = null;

        function setValue(val) {
            value = val;
        }

        function getValue() {
            return value;
        }

        return {
            setValue,
            getValue
        };
    }

    function Player(name, token) {
        return {
            name,
            token
        };
    }

    function GameCoordinator() {
        const gameboard = Gameboard();
        const players = [
            Player("player1", "X"),
            Player("player2", "O")
        ];

        let turnCount = 0;

        let activePlayer = players[0];

        function incrementTurnCount() {
            turnCount += 1;
        }

        function switchPlayer(turn) {
            activePlayer = players[turn % 2];
        }

        function getActivePlayer() {
            return activePlayer;
        } 

        function getTurnCount() {
            return turnCount;
        }

        function printNewRound() {
            gameboard.printBoard();
        }

        function playRound(row, column) {
            log(`${getActivePlayer().name} has made a move`);

            if (gameboard.checkSquareAvailability(row, column)) {
                gameboard.placeMarker(row, column, getActivePlayer().token);
                
                let winner = gameboard.checkForWinner();
                
                if (winner) {
                    endGameMessage.textContent = `${getActivePlayer().name} has won with three ${getActivePlayer().token}s in a row!`;
                    endGameDialog.showModal();
                } else if (turnCount === 8) {
                    endGameMessage.textContent = `The round has ended in a tie!`;
                    endGameDialog.showModal();
                }

                incrementTurnCount();
                switchPlayer(turnCount);
                printNewRound();
            } else {
                invalidSquareMessage.textContent = "That square already has been taken, please try a different square.";
                invalidSquareDialog.showModal();
            }
        }

        return {
            playRound,
            getActivePlayer,
            getBoard: gameboard.getBoard,
            printBoard: gameboard.printBoard,
            getTurnCount
        };
    }

    function ScreenController() {
        let game = GameCoordinator();

        function updateTextDisplay() {
            textDisplay.textContent = `Turn ${game.getTurnCount()}. It is ${game.getActivePlayer().name}'s turn.`;
        }

        function updateBoardDisplay() {
            boardDisplay.innerHTML = "";

            const board = game.getBoard();

            board.forEach((row, i) => {
                row.forEach((square, j) => {
                    const button = document.createElement("button");
                    button.dataset.coordinates = `${i}${j}`;
                    button.textContent = square.getValue();
                    boardDisplay.appendChild(button);
                })
            })
        }

        function newGame() {
            game = GameCoordinator();
            updateTextDisplay();
            updateBoardDisplay();
        }

        boardDisplay.addEventListener("click", (event) => {
            const coordinates = event.target.dataset.coordinates;
            if (coordinates) {
                game.playRound(coordinates[0], coordinates[1]);
                updateTextDisplay();
                updateBoardDisplay();
            }
        });

        updateTextDisplay();
        updateBoardDisplay();

        return {
            newGame
        }
    }

    const screen = ScreenController();

    return {
        Gameboard,
        Square,
        GameCoordinator,
        ScreenController,
    }
}();