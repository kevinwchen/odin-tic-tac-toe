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

    const update = (row, col, playerMarker) => {
        board[row][col] = playerMarker
    }

    const reset = () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]
    }

    const getTile = (row, col) => {
        return board[row][col]
    }

    const checkWinner = () => {}

    return {
        log,
        update,
        reset,
        getTile,
        checkWinner,
    }
})()

// Player factory function
const Player = (marker) => {
    const won = () => {
        console.log(`${marker} wins!`)
    }
    return {
        marker,
        won,
    }
}

// Display module, controls the DOM
const displayController = (() => {
    const tiles = document.querySelectorAll(".tile")

    const reset = () => {
        tiles.forEach((tile) => {
            tile.textContent = ""
        })
    }

    const update = (row, col, playerMarker) => {
        let tileToUpdate = document.querySelector(
            `[data-tile="${String(row) + String(col)}"]`
        )
        tileToUpdate.textContent = playerMarker
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
    }

    const changePlayer = () => {
        currentPlayer === marker1
            ? (currentPlayer = marker2)
            : (currentPlayer = marker1)
    }

    const takeTurn = () => {
        if (getTile(row, col) === "") {
            gameBoard.update(row, col, currentPlayer)
            displayController.update(row, col, currentPlayer)
            changePlayer()
        } else {
            console.log(
                `Illegal move by ${currentPlayer.marker}, space is occupied.`
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

game.newGame()
