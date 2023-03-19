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
        return board[row][col]
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
    const showPickMode = () => {
        document.querySelector(".pick-mode-container").style.display = "block"
    }
    const hidePickMode = () => {
        document.querySelector(".pick-mode-container").style.display = "none"
    }
    const showPickStart = () => {
        document.querySelector(".pick-start-container").style.display = "block"
    }
    const hidePickStart = () => {
        document.querySelector(".pick-start-container").style.display = "none"
    }
    const showForm = () => {
        document.querySelector(".player-form-container").style.display = "grid"
    }
    const hideForm = () => {
        document.querySelector(".player-form-container").style.display = "none"
    }
    const showPlayAgain = () => {
        document.querySelector("#play-again-btn").style.display = "block"
    }
    const hidePlayAgain = () => {
        document.querySelector("#play-again-btn").style.display = "none"
    }

    const announceMode = () => {
        announce.textContent = "Play against the computer or a friend?"
    }
    const announceTurn = () => {
        announce.textContent = "Go first or second?"
    }
    const announceForm = () => {
        announce.textContent = "Enter your names and markers to start playing!"
    }
    const announceClear = () => {
        announce.textContent = ""
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
        result.textContent = `${name} wins!`
    }

    const tie = () => {
        result.textContent = "No winner, tie game."
    }

    return {
        showPickMode,
        hidePickMode,
        showPickStart,
        hidePickStart,
        showForm,
        hideForm,
        showPlayAgain,
        hidePlayAgain,
        announceMode,
        announceTurn,
        announceForm,
        announceClear,
        reset,
        update,
        winner,
        tie,
    }
})()

// Game module, high level controller of game flow
const game = (() => {
    let currentPlayer

    const restart = () => {
        gameBoard.reset()
        displayController.announceMode()
        displayController.showPickMode()
        displayController.hidePickStart()
        displayController.hideForm()
        currentPlayer = undefined
    }

    const newGame = () => {
        currentPlayer = player1
        console.log("Ready to play!")
    }

    const changePlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }

    const takeTurn = (row, col) => {
        if (currentPlayer === undefined) {
            console.log("Game must be set up before playing.")
        } else if (gameBoard.getTile(row, col) === "") {
            gameBoard.update(row, col, currentPlayer)
            displayController.update(row, col, currentPlayer)

            if (gameBoard.checkWinner(currentPlayer)) {
                displayController.winner(currentPlayer.getName())
                displayController.showPlayAgain()
                console.log(`${currentPlayer.getName()} wins!`)
                currentPlayer = undefined
            } else if (gameBoard.checkTie()) {
                displayController.tie()
                displayController.showPlayAgain()
                console.log("No winner, tie game.")
                currentPlayer = undefined
            } else {
                changePlayer()
                if (currentPlayer.getName() === "Computer") {
                    if (gameMode === 1) {
                        computer.takeTurnRandom()
                    } else if (gameMode === 2) {
                    }
                }
            }
        } else {
            console.log(
                `Illegal move by ${currentPlayer.getName()}, (${row}, ${col}) is taken.`
            )
        }
    }

    const getCurrentPlayer = () => {
        return currentPlayer
    }

    const setDefaultPlayers = (playerOneName, playerTwoName) => {
        player1 = Player(playerOneName, "X")
        player2 = Player(playerTwoName, "O")
    }

    return {
        restart,
        newGame,
        changePlayer,
        takeTurn,
        getCurrentPlayer,
        setDefaultPlayers,
    }
})()

// Computer module for taking turns
const computer = (() => {
    const takeTurnRandom = () => {
        let row, col
        let turnTaken = false

        while (!turnTaken) {
            row = Math.floor(Math.random() * 3)
            col = Math.floor(Math.random() * 3)
            if (gameBoard.getTile(row, col) === "") {
                game.takeTurn(row, col)
                turnTaken = true
            }
        }
    }
    return {
        takeTurnRandom,
    }
})()

const modeCompBtn = document.querySelector("#mode-comp-btn")
const modeFriendBtn = document.querySelector("#mode-friend-btn")
const startFirstBtn = document.querySelector("#start-first-btn")
const startSecondBtn = document.querySelector("#start-second-btn")
const newGameBtn = document.querySelector("#newGame-btn")
const playAgainBtn = document.querySelector("#play-again-btn")
const announce = document.querySelector(".announce")
const result = document.querySelector(".result")
const playerFormContainer = document.querySelector(".player-form-container")
const playerForm = document.querySelector(".player-form")
const tiles = document.querySelectorAll(".tile")
let gameMode = 0
let player1 = Player("Player 1", "X")
let player2 = Player("Player 2", "O")

game.setDefaultPlayers("Player 1", "Player 2")

modeCompBtn.addEventListener("click", (event) => {
    console.log("1 Player mode")
    displayController.hidePickMode()
    displayController.showPickStart()
    displayController.announceTurn()
})
modeFriendBtn.addEventListener("click", (event) => {
    console.log("2 Player mode")
    displayController.hidePickMode()
    displayController.showForm()
    displayController.announceForm()
})
startFirstBtn.addEventListener("click", (event) => {
    console.log("Player starts first")
    displayController.hidePickStart()
    player1 = Player("Player", "X")
    player2 = Player("Computer", "O")
    gameMode = 1
    game.newGame()
})
startSecondBtn.addEventListener("click", (event) => {
    console.log("Computer starts first")
    displayController.hidePickStart()
    player1 = Player("Computer", "X")
    player2 = Player("Player", "O")
    gameMode = 1
    game.newGame()
    computer.takeTurnRandom()
})

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
        displayController.hideForm()
    }
    event.preventDefault()
})

playAgainBtn.addEventListener("click", (event) => {
    gameBoard.reset()
    displayController.reset()
    // game.newGame()
    playerForm.reset()
    displayController.hidePickStart()
    displayController.hidePlayAgain()
    displayController.showPickMode()
    displayController.announceMode()
})

tiles.forEach((tile) => {
    let row = tile.dataset.row
    let col = tile.dataset.col
    tile.addEventListener("click", () => {
        game.takeTurn(row, col)
    })
})

game.restart()

// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!
// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
// If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

// Choose one or two player
// two player mode done
// one player mode only X (goes first) and O
// Choose to be X (first) or O (second)
// after game finishes, go back to picking one/two player version
