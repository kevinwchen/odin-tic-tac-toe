import Player from "./Player.js"

const utils = (() => {
    let gameMode = 0
    let difficulty = 1
    let player1 = Player("Player 1", "X")
    let player2 = Player("Player 2", "O")
    let humanPlayer, computerPlayer, currentPlayer

    const getGameMode = () => {
        return gameMode
    }
    const getDifficulty = () => {
        return difficulty
    }
    const getPlayer1 = () => {
        return player1
    }
    const getPlayer2 = () => {
        return player2
    }
    const getHumanPlayer = () => {
        return humanPlayer
    }
    const getComputerPlayer = () => {
        return computerPlayer
    }
    const getCurrentPlayer = () => {
        return currentPlayer
    }

    const setGameMode = (arg) => {
        gameMode = arg
    }
    const setDifficulty = (arg) => {
        difficulty = arg
    }
    const setPlayer1 = (arg) => {
        player1 = arg
    }
    const setPlayer2 = (arg) => {
        player2 = arg
    }
    const setHumanPlayer = (arg) => {
        humanPlayer = arg
    }
    const setComputerPlayer = (arg) => {
        computerPlayer = arg
    }
    const setCurrentPlayer = (arg) => {
        currentPlayer = arg
    }

    return {
        getGameMode,
        getDifficulty,
        getPlayer1,
        getPlayer2,
        getHumanPlayer,
        getComputerPlayer,
        getCurrentPlayer,
        setGameMode,
        setDifficulty,
        setPlayer1,
        setPlayer2,
        setHumanPlayer,
        setComputerPlayer,
        setCurrentPlayer,
    }
})()

export default utils
