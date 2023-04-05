// Run with:
// NODE_OPTIONS=--experimental-vm-modules npx jest

import utils from "../public/utils.js"
import gameBoard from "../public/gameBoard.js"

test("Check game board is initialised correctly", () => {
    expect(gameBoard.getBoard()).toStrictEqual([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ])
})

test("Check game board is updated correctly", () => {
    gameBoard.reset()
    gameBoard.update(1, 1, utils.getPlayer1())
    expect(gameBoard.getBoard()).toStrictEqual([
        ["", "", ""],
        ["", "X", ""],
        ["", "", ""],
    ])
})

test("Check game board is reset correctly", () => {
    gameBoard.reset()
    expect(gameBoard.getBoard()).toStrictEqual([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ])
})

test("Check game board returns tile correctly", () => {
    gameBoard.update(1, 1, utils.getPlayer1())
    expect(gameBoard.getTile(1, 1)).toStrictEqual("X")
})

test("Check game board returns empty tiles correctly", () => {
    gameBoard.reset()
    expect(gameBoard.getEmpty(gameBoard.getBoard()).toString()).toStrictEqual(
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2],
        ].toString()
    )
})

test("Check game board returns empty tiles correctly after a player move", () => {
    gameBoard.reset()
    gameBoard.update(1, 1, utils.getPlayer1())
    expect(gameBoard.getEmpty(gameBoard.getBoard()).toString()).toStrictEqual(
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2],
        ].toString()
    )
})
