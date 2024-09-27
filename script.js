const GLOBAL = function(){
    const log = console.log;

    function Gameboard(testBoard=false) {
        const rows = 3;
        const columns = 3;
        //CHANGE TO CONST
        let board = [];

        for (let i = 0; i < rows; ++i) {
            board[i] = [];
            for (let j = 0; j < columns; ++j) {
                board[i].push(Square());
            }
        }
        
        if (testBoard) {
            board = testBoard;
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

    function Square(testVal=false) {
        let value = null;

        if (testVal) {
            value = testVal;
        }

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

        function printNewRound() {
            gameboard.printBoard();
            log(`Turn ${turnCount}. It is ${getActivePlayer().name}'s turn`)
        }

        function playRound(row, column) {
            log(`${activePlayer} has made a move`);

            if (gameboard.checkSquareAvailability(row, column)) {
                gameboard.placeMarker(row, column, getActivePlayer().token);
                
                let winner = gameboard.checkForWinner()
                
                if (winner) {
                    return winner;
                }

                incrementTurnCount();
                switchPlayer(turnCount);
                printNewRound();
            } else {
                log("That square already has a marker, please try a different square.")
            }
        }

        return {
            playRound,
            getActivePlayer,
            getBoard: gameboard.getBoard
        };
    }

    function ScreenController() {
        const game = GameCoordinator();

        const textDisplay = document.querySelector(".text-display");
        const boardDisplay = document.querySelector(".board");

        function updateTextDisplay(str) {
            textDisplay.textContent = str;
        }

        function updateBoardDisplay() {
            boardDisplay.textContent = "";

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

        boardDisplay.addEventListener("click", (event) => {
            const coordinates = event.target.dataset.coordinates;
            if (coordinates) {
                game.playRound(coordinates[0], coordinates[1]);
                updateTextDisplay("make this text display the round number and active player");
                updateBoardDisplay();
            }
        });

        updateTextDisplay("make this text display the round number and active player");
        updateBoardDisplay();

        return {
            updateBoardDisplay
        }
    }

    ScreenController();

    //TEST BOARDS

    const rowboard = [];
    for (let i = 0; i < 2; ++i) {
        rowboard[i] = [];
        for (let j = 0; j < 3; ++j) {
            rowboard[i].push(Square(null));
        }
    }
    rowboard.push([Square('X'), Square('X'), Square('X')])

    const colboard = [];
    for (let i = 0; i < 3; ++i) {
        colboard[i] = [];
        for (let j = 0; j < 3; ++j) {
            if (j === 1) {
                colboard[i].push(Square('X'));
            } else {
                colboard[i].push(Square(null));
            }
        }
    }

    const diagboard1 = [];
    for (let i = 0; i < 3; ++i) {
        diagboard1[i] = [];
        for (let j = 0; j < 3; ++j) {
            if (i === j) {
                diagboard1[i].push(Square('X'));
            } else {
                diagboard1[i].push(Square(null));
            }
        }
    }

    const diagboard2 = [];
    for (let i = 0; i < 3; ++i) {
        diagboard2[i] = [];
        for (let j = 0; j < 3; ++j) {
            if (i + j === 2) {
                diagboard2[i].push(Square('X'));
            } else {
                diagboard2[i].push(Square(null));
            }
        }
    }

    return {
        Gameboard,
        Square,
        GameCoordinator,
        ScreenController,
        rowboard,
        colboard,
        diagboard1,
        diagboard2
    }
}();