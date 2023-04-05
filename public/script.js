const modeCompBtn = document.querySelector("#mode-comp-btn")
const modeFriendBtn = document.querySelector("#mode-friend-btn")
const startFirstBtn = document.querySelector("#start-first-btn")
const startSecondBtn = document.querySelector("#start-second-btn")
const diffEasyBtn = document.querySelector("#diff-easy-btn")
const diffMinimaxBtn = document.querySelector("#diff-minimax-btn")
const newGameBtn = document.querySelector("#newGame-btn")
const playAgainBtn = document.querySelector("#play-again-btn")
// const announce = document.querySelector(".announce")
// const result = document.querySelector(".result")
// const playerFormContainer = document.querySelector(".player-form-container")
const playerForm = document.querySelector(".player-form")
const tiles = document.querySelectorAll(".tile")

import utils from "./utils.js"
import gameBoard from "./gameBoard.js"
import game from "./game.js"
import displayController from "./displayController.js"
import computer from "./computer.js"

game.setDefaultPlayers("Player 1", "Player 2")

document.addEventListener("DOMContentLoaded", () => {
    modeFriendBtn.addEventListener("click", (event) => {
        utils.setGameMode(2)
        console.log("2 Player mode")
        displayController.hidePickMode()
        displayController.showForm()
        displayController.announceForm()
    })
    modeCompBtn.addEventListener("click", (event) => {
        utils.setGameMode(1)
        console.log("1 Player mode")
        displayController.hidePickMode()
        displayController.showPickDiff()
        displayController.announceChooseDiff()
    })
    diffEasyBtn.addEventListener("click", (event) => {
        utils.setDifficulty(1)
        console.log("Easy difficulty mode")
        displayController.hidePickDiff()
        displayController.showPickStart()
        displayController.announceTurn()
    })
    diffMinimaxBtn.addEventListener("click", (event) => {
        utils.setDifficulty(2)
        console.log("Unbeatable difficulty mode")
        displayController.hidePickDiff()
        displayController.showPickStart()
        displayController.announceTurn()
    })
    startFirstBtn.addEventListener("click", (event) => {
        console.log("Player starts first")
        displayController.hidePickStart()
        game.setDefaultPlayers("Player", "Computer")
        utils.setHumanPlayer(utils.getPlayer1())
        utils.setComputerPlayer(utils.getPlayer2())
        game.newGame()
        displayController.reset()
    })
    startSecondBtn.addEventListener("click", (event) => {
        console.log("Computer starts first")
        displayController.hidePickStart()
        game.setDefaultPlayers("Computer", "Player")
        utils.setHumanPlayer(utils.getPlayer2())
        utils.setComputerPlayer(utils.getPlayer1())
        game.newGame()
        displayController.reset()
        computer.takeTurn()
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
            utils.getPlayer1().setName(name1)
            utils.getPlayer2().setName(name2)
            utils.getPlayer1().setMarker(marker1)
            utils.getPlayer2().setMarker(marker2)
            game.newGame()
            displayController.hideForm()
            playerForm.reset()
            displayController.reset()
        }
        event.preventDefault()
    })

    playAgainBtn.addEventListener("click", (event) => {
        gameBoard.reset()
        displayController.reset()
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
})
