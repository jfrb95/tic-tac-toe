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
                board[i].push(Square('X'));
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
        rowboard,
        colboard,
        diagboard1,
        diagboard2
        
    }
}();