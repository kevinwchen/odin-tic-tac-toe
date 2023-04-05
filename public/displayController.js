// Display module, controls the DOM

import utils from "./utils.js"

// const modeCompBtn = document.querySelector("#mode-comp-btn")
// const modeFriendBtn = document.querySelector("#mode-friend-btn")
// const startFirstBtn = document.querySelector("#start-first-btn")
// const startSecondBtn = document.querySelector("#start-second-btn")
// const diffEasyBtn = document.querySelector("#diff-easy-btn")
// const diffMinimaxBtn = document.querySelector("#diff-minimax-btn")
// const newGameBtn = document.querySelector("#newGame-btn")
// const playAgainBtn = document.querySelector("#play-again-btn")
const announce = document.querySelector(".announce")
const result = document.querySelector(".result")
const tiles = document.querySelectorAll(".tile")

const displayController = (() => {
    const showPickMode = () => {
        document.querySelector(".pick-mode-container").style.display = "block"
    }
    const hidePickMode = () => {
        document.querySelector(".pick-mode-container").style.display = "none"
    }
    const showPickDiff = () => {
        document.querySelector(".pick-diff-container").style.display = "block"
    }
    const hidePickDiff = () => {
        document.querySelector(".pick-diff-container").style.display = "none"
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
    const announceChooseDiff = () => {
        announce.textContent = "What difficulty?"
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
        announce.textContent = `Let's play! ${utils
            .getPlayer1()
            .getName()} moves first.`
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
        showPickDiff,
        hidePickDiff,
        showForm,
        hideForm,
        showPlayAgain,
        hidePlayAgain,
        announceMode,
        announceChooseDiff,
        announceTurn,
        announceForm,
        announceClear,
        reset,
        update,
        winner,
        tie,
    }
})()

export default displayController
