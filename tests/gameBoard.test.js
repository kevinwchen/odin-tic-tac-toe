// Run with:
// NODE_OPTIONS=--experimental-vm-modules npx jest

import gameBoard from "../src/gameBoard.js"

test("Check board is initialised correctly", () => {
    expect(gameBoard.getBoard()).toStrictEqual([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ])
})
