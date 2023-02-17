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
        return board[row][col]
    }

    const checkWinner = (marker) => {}

    const checkEnd = () => {
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
        checkEnd,
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
    }

    const update = (row, col, marker) => {
        let tileToUpdate = document.querySelector(
            `[data-tile="${String(row) + String(col)}"]`
        )
        tileToUpdate.textContent = marker
        announce.textContent = `${marker} chose (${row},${col})`
    }

    const winner = (marker) => {
        winner.textContent = `${marker} wins!`
    }

    return {
        reset,
        update,
    }
})()

// Game module, high level controller of game flow
const game = (() => {
    const marker1 = "X"
    const marker2 = "O"

    const player1 = Player(marker1)
    const player2 = Player(marker2)

    let currentPlayer = player1.marker

    const newGame = () => {
        gameBoard.reset()
        displayController.reset()
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
                console.log(`${currentPlayer} wins!`)
            } else if (checkEnd) {
                console.log("No winner")
            } else {
                changePlayer()
            }
        } else {
            console.log(
                `Illegal move by ${currentPlayer.marker}, (${row}, ${col}) is occupied.`
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
const winner = document.querySelector(".winner")
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
