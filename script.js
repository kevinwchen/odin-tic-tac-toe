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

    const update = (row, col, player) => {
        board[row][col] = player.getMarker()
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

    const checkWinner = (player) => {
        let marker = player.getMarker()
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
const Player = (playerName, playerMarker) => {
    let name = playerName
    let marker = playerMarker

    const setName = (newName) => {
        name = newName
    }

    const setMarker = (newMarker) => {
        marker = newMarker
    }
    const getName = () => name
    const getMarker = () => marker

    return {
        setName,
        setMarker,
        getName,
        getMarker,
    }
}

// Display module, controls the DOM
const displayController = (() => {
    const showForm = () => {
        playerFormContainer.style.display("block")
    }

    const hideForm = () => {
        playerFormContainer.style.display("none")
    }

    const reset = () => {
        tiles.forEach((tile) => {
            tile.textContent = ""
        })
        announce.textContent = `Let's play! ${player1.getName()} moves first.`
        result.textContent = ""
    }

    const update = (row, col, player) => {
        let tileToUpdate = document.querySelector(
            `[data-tile="${String(row) + String(col)}"]`
        )
        tileToUpdate.textContent = player.getMarker()
        announce.textContent = `${player.getName()} chose (${row},${col})`
    }

    const winner = (name) => {
        result.textContent = `${name} wins, congratulations!`
    }

    const tie = () => {
        result.textContent = "No winner, tie game."
    }

    return {
        showForm,
        hideForm,
        reset,
        update,
        winner,
        tie,
    }
})()

// Game module, high level controller of game flow
const game = (() => {
    let currentPlayer

    const newGame = () => {
        gameBoard.reset()
        displayController.reset()
        currentPlayer = player1
        console.log("Ready to play!")
    }

    const changePlayer = () => {
        currentPlayer === player1
            ? (currentPlayer = player2)
            : (currentPlayer = player1)
    }

    const takeTurn = (row, col) => {
        if (currentPlayer === undefined) {
            console.log("No players set up.")
        } else if (gameBoard.getTile(row, col) === "") {
            gameBoard.update(row, col, currentPlayer)
            displayController.update(row, col, currentPlayer)

            if (gameBoard.checkWinner(currentPlayer)) {
                displayController.winner(currentPlayer.getName())
                console.log(`${currentPlayer.getName()} wins, congratulations!`)
            } else if (gameBoard.checkTie()) {
                displayController.tie()
                console.log("No winner, tie game.")
            } else {
                changePlayer()
                console.log("here")
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
const playerFormContainer = document.querySelector(".player-form-container")
const playerForm = document.querySelector(".player-form")
const tiles = document.querySelectorAll(".tile")

const player1 = Player("Player 1", "X")
const player2 = Player("Player 2", "O")

newGameBtn.addEventListener("click", (event) => {
    let name1 = document.getElementById("player1-name").value
    let name2 = document.getElementById("player2-name").value
    let marker1 = document.getElementById("player1-marker").value
    let marker2 = document.getElementById("player2-marker").value
    if (
        name1 !== "" &&
        name2 !== "" &&
        marker1 !== "" &&
        marker2 !== "" &&
        marker1 !== marker2
    ) {
        console.log("New game starting...")
        player1.setName(name1)
        player2.setName(name2)
        player1.setMarker(marker1)
        player2.setMarker(marker2)
        game.newGame()
        playerForm.reset()
    }
    event.preventDefault()
})

tiles.forEach((tile) => {
    let row = tile.dataset.row
    let col = tile.dataset.col
    tile.addEventListener("click", () => {
        game.takeTurn(row, col)
    })
})

// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!
// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
// If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!
