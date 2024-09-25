const GLOBAL = function(){
    const log = console.log;

    function Gameboard(testBoard=false) {
        const rows = 3;
        const columns = 3;
        const board = [];

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

        function placeMarker(row, column, naughtOrCross) {
            board[row][column].setValue(naughtOrCross);
        }

        function printBoard() {
            log(board.map((row) => {
                return row.map((square) => {
                    return square.getValue();
                })
            }))
        }

        function checkForWinner() {
            let winner;

            for (const row of board) {
                if (row[0].getValue() &&
                    row[0].getValue() === row[1].getValue() &&
                    row[1].getValue() === row[2].getValue()) 
                {
                    log(row[0].getValue(), row[1].getValue(), row[2].getValue())
                    winner = row[0].getValue()
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
                    }                
            }

            if (!winner) {
                if (board[0][2].getValue() &&
                    board[0][2].getValue() === board[1][1].getValue() &&
                    board[1][1].getValue() === board[2][0].getValue())
                    {
                        winner = board[0][2].getValue();
                    }
            }

            return winner;
        }

        return {
            getBoard,
            placeMarker,
            printBoard,
            checkForWinner
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

        function playRound(row, column) {
            log(`It is ${activePlayer}'s turn`);

        }

        return {

        };
    }

    return {
        Gameboard,
        Square,
    }
}();