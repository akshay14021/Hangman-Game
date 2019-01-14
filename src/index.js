import Hangman from "./hangman";
import getPuzzle from "./requests";

// Game Setup and initial display
let game1

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    renderGame()

    // Game change function when making guesses
    game1.gameDisplay()
}

const renderGame = () => {
    document.querySelector('#puzzle').innerHTML = ''
    document.querySelector('#remaining-guess').textContent = `Guesses Left: ${game1.remainingGuesses}`

    game1.getPuzzle().split('').forEach((letter) => {
        const spanElement = document.createElement('span')
        spanElement.textContent = letter
        document.querySelector('#puzzle').appendChild(spanElement)
    })
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()

export { game1 as default, renderGame }