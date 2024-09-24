const GLOBAL = function(){
    const log = console.log;

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

        return {
            getBoard,
            placeMarker,
            printBoard
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

    return {
        Gameboard,
        Square,
    }
}();