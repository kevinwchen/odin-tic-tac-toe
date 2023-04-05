// Game board module, stores game state
const gameBoard = (() => {
    // board grid:
    //    0, 1, 2
    // 0 [ ,  ,  ]
    // 1 [ ,  ,  ]
    // 2 [ ,  ,  ]
    let board = [
        ["", "", ""],
        ["", "O", ""],
        ["", "", ""],
    ]

    const log = () => {
        console.log("Current board state:")
        for (let i = 0; i < 3; i++) {
            console.log(board[i])
        }
    }

    const update = (row, col, player) => {
        board[row][col] = player.getMarker()
    }

    const reset = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = ""
            }
        }
    }

    const getTile = (row, col) => {
        return board[row][col]
    }

    const getBoard = () => {
        return board
    }

    const getEmpty = (checkBoard) => {
        // console.log(checkBoard)
        let emptyBoard = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (checkBoard[i][j] === "") {
                    emptyBoard.push([i, j])
                }
            }
        }
        return emptyBoard
    }

    const checkWinner = (checkBoard, player) => {
        let marker = player.getMarker()
        let gameWon = false
        for (let i = 0; i < 3; i++) {
            if (
                (checkBoard[i][0] === marker &&
                    checkBoard[i][1] === marker &&
                    checkBoard[i][2] === marker) ||
                (checkBoard[0][i] === marker &&
                    checkBoard[1][i] === marker &&
                    checkBoard[2][i] === marker)
            ) {
                gameWon = true
            }
        }
        if (
            (checkBoard[0][0] === marker &&
                checkBoard[1][1] === marker &&
                checkBoard[2][2] === marker) ||
            (checkBoard[0][2] === marker &&
                checkBoard[1][1] === marker &&
                checkBoard[2][0] === marker)
        ) {
            gameWon = true
        }
        return gameWon
    }

    const checkTie = (checkBoard) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (checkBoard[i][j] === "") {
                    return false
                }
            }
        }
        return true
    }

    return {
        log,
        update,
        reset,
        getTile,
        getBoard,
        getEmpty,
        checkWinner,
        checkTie,
    }
})()

export default gameBoard
