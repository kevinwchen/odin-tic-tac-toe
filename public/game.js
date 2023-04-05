// Game module, high level controller of game flow

import Player from "./Player.js"
import utils from "./utils.js"
import computer from "./computer.js"
import gameBoard from "./gameBoard.js"
import displayController from "./displayController.js"

const game = (() => {
    const restart = () => {
        gameBoard.reset()
        displayController.announceMode()
        displayController.showPickMode()
        displayController.hidePickStart()
        displayController.hideForm()
        utils.setCurrentPlayer(undefined)
    }

    const newGame = () => {
        utils.setCurrentPlayer(utils.getPlayer1())
        console.log("Ready to play!")
    }

    const changePlayer = () => {
        if (utils.getCurrentPlayer() === utils.getPlayer1()) {
            utils.setCurrentPlayer(utils.getPlayer2())
        } else {
            utils.setCurrentPlayer(utils.getPlayer1())
        }
    }

    const takeTurn = (row, col) => {
        if (utils.getCurrentPlayer() === undefined) {
            console.log("Game must be set up before playing.")
        } else if (gameBoard.getTile(row, col) === "") {
            gameBoard.update(row, col, utils.getCurrentPlayer())
            displayController.update(row, col, utils.getCurrentPlayer())

            if (
                gameBoard.checkWinner(
                    gameBoard.getBoard(),
                    utils.getCurrentPlayer()
                )
            ) {
                displayController.winner(utils.getCurrentPlayer().getName())
                displayController.showPlayAgain()
                console.log(`${utils.getCurrentPlayer().getName()} wins!`)
                utils.setCurrentPlayer(undefined)
            } else if (gameBoard.checkTie(gameBoard.getBoard())) {
                displayController.tie()
                displayController.showPlayAgain()
                console.log("No winner, tie game.")
                utils.setCurrentPlayer(undefined)
            } else {
                changePlayer()
                if (
                    utils.getCurrentPlayer().getName() === "Computer" &&
                    utils.getGameMode() === 1
                ) {
                    computer.takeTurn()
                }
            }
        } else {
            console.log(
                `Illegal move by ${utils
                    .getCurrentPlayer()
                    .getName()}, (${row}, ${col}) is taken.`
            )
        }
    }

    const getCurrentPlayer = () => {
        return utils.getCurrentPlayer()
    }

    const setDefaultPlayers = (playerOneName, playerTwoName) => {
        utils.setPlayer1(Player(playerOneName, "X"))
        utils.setPlayer2(Player(playerTwoName, "O"))
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

export default game
