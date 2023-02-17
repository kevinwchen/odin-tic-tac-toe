// Game board module, stores game state
const gameBoard = (() => {
    // board grid:
    //    0, 1, 2
    // 0 [ ,  ,  ]
    // 1 [ ,  ,  ]
    // 2 [ ,  ,  ]
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]

    const log = () => {
        console.log("Current board state:")
        for (i = 0; i < 3; i++) {
            console.log(board[i])
        }
    }

    const update = (row, col, marker) => {
        board[row][col] = marker
    }

    const reset = () => {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                board[i][j] = ""
            }
        }
    }

    const getTile = (row, col) => {
        return board[Number(row)][Number(col)]
    }

    const checkWinner = (marker) => {
        let gameWon = false
        for (let i = 0; i < 3; i++) {
            if (
                (gameBoard.getTile(i, 0) === marker &&
                    gameBoard.getTile(i, 1) === marker &&
                    gameBoard.getTile(i, 2) === marker) ||
                (gameBoard.getTile(0, i) === marker &&
                    gameBoard.getTile(1, i) === marker &&
                    gameBoard.getTile(2, i) === marker)
            ) {
                gameWon = true
            }
        }
        if (
            (gameBoard.getTile(0, 0) === marker &&
                gameBoard.getTile(1, 1) === marker &&
                gameBoard.getTile(2, 2) === marker) ||
            (gameBoard.getTile(0, 2) === marker &&
                gameBoard.getTile(1, 1) === marker &&
                gameBoard.getTile(2, 0) === marker)
        ) {
            gameWon = true
        }
        return gameWon
    }

    const checkTie = () => {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (board[i][j] === "") {
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
        checkWinner,
        checkTie,
    }
})()

// Player factory function
const Player = (marker) => {
    return {
        marker,
    }
}

// Display module, controls the DOM
const displayController = (() => {
    const reset = () => {
        tiles.forEach((tile) => {
            tile.textContent = ""
        })
        announce.textContent = "Let's play!"
        result.textContent = ""
    }

    const update = (row, col, marker) => {
        let tileToUpdate = document.querySelector(
            `[data-tile="${String(row) + String(col)}"]`
        )
        tileToUpdate.textContent = marker
        announce.textContent = `${marker} chose (${row},${col})`
    }

    const winner = (marker) => {
        result.textContent = `${marker} wins, congratulations!`
    }

    const tie = () => {
        result.textContent = "No winner, tie game."
    }

    return {
        reset,
        update,
        winner,
        tie,
    }
})()

// Game module, high level controller of game flow
const game = (() => {
    const marker1 = "X"
    const marker2 = "O"

    const player1 = Player(marker1)
    const player2 = Player(marker2)

    let currentPlayer

    const newGame = () => {
        gameBoard.reset()
        displayController.reset()
        currentPlayer = player1.marker
        console.log("Ready to play!")
    }

    const changePlayer = () => {
        currentPlayer === player1.marker
            ? (currentPlayer = player2.marker)
            : (currentPlayer = player1.marker)
    }

    const takeTurn = (row, col) => {
        if (gameBoard.getTile(row, col) === "") {
            gameBoard.update(row, col, currentPlayer)
            displayController.update(row, col, currentPlayer)

            if (gameBoard.checkWinner(currentPlayer)) {
                displayController.winner(currentPlayer)
                console.log(`${currentPlayer} wins, congratulations!`)
            } else if (gameBoard.checkTie()) {
                displayController.tie()
                console.log("No winner, tie game.")
            } else {
                changePlayer()
            }
        } else {
            console.log(
                `Illegal move by ${currentPlayer}, (${row}, ${col}) is taken.`
            )
        }
    }

    const getCurrentPlayer = () => {
        return currentPlayer
    }

    return {
        newGame,
        changePlayer,
        takeTurn,
        getCurrentPlayer,
    }
})()

const newGameBtn = document.querySelector("#newGame-btn")
const announce = document.querySelector(".announce")
const result = document.querySelector(".result")
const tiles = document.querySelectorAll(".tile")

newGameBtn.addEventListener("click", () => {
    game.newGame()
})

tiles.forEach((tile) => {
    let row = tile.dataset.row
    let col = tile.dataset.col
    tile.addEventListener("click", () => {
        game.takeTurn(row, col)
    })
})

game.newGame()
