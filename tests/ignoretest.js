import gameBoard from "./gameBoard.js"

test("test1", () => {
    document.body.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <link rel="stylesheet" href="style.css" />
            <script defer src="script.js"></script>
            <title>Odin Tic Tac Toe</title>
        </head>
        <body>
            <div class="header">Tic-Tac-Toe</div>
            <div class="info">
                <div class="announce"></div>
                <div class="pick-mode-container">
                    <button id="mode-comp-btn" class="setup-btn">
                        The computer
                    </button>
                    <button id="mode-friend-btn" class="setup-btn">A friend</button>
                </div>
                <div class="pick-diff-container">
                    <button id="diff-easy-btn" class="setup-btn">Easy</button>
                    <button id="diff-minimax-btn" class="setup-btn">
                        Unbeatable..?
                    </button>
                </div>
                <div class="pick-start-container">
                    <button id="start-first-btn" class="setup-btn">
                        First (X)
                    </button>
                    <button id="start-second-btn" class="setup-btn">
                        Second (O)
                    </button>
                </div>
                <div class="result"></div>
                <div class="player-form-container">
                    <form class="player-form" action="submit">
                        <div>Player 1</div>
                        <input
                            type="text"
                            name="player1-name"
                            id="player1-name"
                            placeholder="Name (e.g. Ticky)"
                            required
                        />
                        <input
                            type="text"
                            name="player1-marker"
                            id="player1-marker"
                            placeholder="Marker (e.g. X)"
                            required
                            maxlength="1"
                        />
                        <div>Player 2</div>
                        <input
                            type="text"
                            name="player2-name"
                            id="player2-name"
                            placeholder="Name (e.g. Tacko)"
                            required
                        />
                        <input
                            type="text"
                            name="player2-marker"
                            id="player2-marker"
                            placeholder="Marker (e.g. O)"
                            required
                            maxlength="1"
                        />
                        <button id="newGame-btn">Start New Game</button>
                    </form>
                </div>
                <button id="play-again-btn" class="setup-btn">Play Again?</button>
            </div>
    
            <div class="board">
                <div class="tile" data-tile="00" data-row="0" data-col="0"></div>
                <div class="tile" data-tile="01" data-row="0" data-col="1"></div>
                <div class="tile" data-tile="02" data-row="0" data-col="2"></div>
                <div class="tile" data-tile="10" data-row="1" data-col="0"></div>
                <div class="tile" data-tile="11" data-row="1" data-col="1"></div>
                <div class="tile" data-tile="12" data-row="1" data-col="2"></div>
                <div class="tile" data-tile="20" data-row="2" data-col="0"></div>
                <div class="tile" data-tile="21" data-row="2" data-col="1"></div>
                <div class="tile" data-tile="22" data-row="2" data-col="2"></div>
            </div>
            <div class="footer">
                Made by Kevin
                <div class="git">
                    <a href="https://github.com/kevinwchen">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 496 512"
                            height="25"
                        >
                            >
                            <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path
                                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </body>
    </html>
    `
    const modeCompBtn = document.querySelector("#mode-comp-btn")
    const modeFriendBtn = document.querySelector("#mode-friend-btn")
    const startFirstBtn = document.querySelector("#start-first-btn")
    const startSecondBtn = document.querySelector("#start-second-btn")
    const diffEasyBtn = document.querySelector("#diff-easy-btn")
    const diffMinimaxBtn = document.querySelector("#diff-minimax-btn")
    const newGameBtn = document.querySelector("#newGame-btn")
    const playAgainBtn = document.querySelector("#play-again-btn")
    const announce = document.querySelector(".announce")
    const result = document.querySelector(".result")
    const playerFormContainer = document.querySelector(".player-form-container")
    const playerForm = document.querySelector(".player-form")
    const tiles = document.querySelectorAll(".tile")

    console.log(exports.gameBoard.getBoard())
})
