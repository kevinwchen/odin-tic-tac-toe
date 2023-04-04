// Computer module for taking turns

import utils from "./utils.js"
import gameBoard from "./gameBoard.js"
import game from "./game.js"

const computer = (() => {
    const takeTurn = () => {
        if (utils.getDifficulty() === 1) {
            takeTurnRandom()
        } else if (utils.getDifficulty() === 2) {
            takeTurnMinimax()
        }
    }

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

    const takeTurnMinimax = () => {
        const minimax = (newBoard, player, depth) => {
            let moves = []
            let chosenMoveIndex = 0
            let emptyTiles = gameBoard.getEmpty(newBoard)

            if (gameBoard.checkWinner(newBoard, utils.getHumanPlayer())) {
                return { score: -10 + depth }
            } else if (
                gameBoard.checkWinner(newBoard, utils.getComputerPlayer())
            ) {
                return { score: 10 - depth }
            } else if (emptyTiles.length == 0) {
                return { score: 0 }
            }

            depth += 1

            for (let i = 0; i < emptyTiles.length; i++) {
                let move = {}
                move.row = emptyTiles[i][0]
                move.col = emptyTiles[i][1]

                // make test move to empty tile
                newBoard[move.row][move.col] = player.getMarker()

                // take next turn
                if (player.getName() == utils.getComputerPlayer().getName()) {
                    move.score = minimax(
                        newBoard,
                        utils.getHumanPlayer(),
                        depth
                    ).score
                } else {
                    move.score = minimax(
                        newBoard,
                        utils.getComputerPlayer(),
                        depth
                    ).score
                }

                newBoard[move.row][move.col] = "" // reset test move
                moves.push(move)
            }

            if (player === utils.getComputerPlayer()) {
                let bestScore = -Infinity
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score > bestScore) {
                        chosenMoveIndex = i
                        bestScore = moves[i].score
                    }
                }
            } else {
                let bestScore = Infinity
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score < bestScore) {
                        chosenMoveIndex = i
                        bestScore = moves[i].score
                    }
                }
            }

            return moves[chosenMoveIndex]
        }

        let chosenMove = minimax(
            gameBoard.getBoard(),
            utils.getComputerPlayer(),
            0
        )
        game.takeTurn(chosenMove.row, chosenMove.col)
    }

    return {
        takeTurn,
    }
})()

export default computer
