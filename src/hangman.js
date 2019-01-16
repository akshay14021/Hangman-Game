import game1, { renderGame } from "./index";

class Hangman {
    constructor (word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'Playing'
    }
    getPuzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle = puzzle + letter
            } else {
                puzzle = puzzle + '*'
            }
        })
        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()

        const letterFound = this.word.find((letter) => {
            return letter === guess
        })

        if (!this.guessedLetters.includes(guess) && letterFound !== undefined) {
            this.guessedLetters = [...this.guessedLetters, guess]
        } else if (!this.guessedLetters.includes(guess) && letterFound === undefined) {
            this.remainingGuesses--
        }
    }
    statusMessage() {
        if (this.status === 'Playing') {
            document.querySelector('#remaining-guess').textContent = `Guesses Left: ${game1.remainingGuesses}`
        } else if (this.status === 'Failed') {
            document.querySelector('#remaining-guess').textContent = `Nice try! The word was "${this.word.join('').toUpperCase()}".`
        } else if (this.status === 'Finished') {
            document.querySelector('#remaining-guess').textContent = 'Great Work! You guessed the word'
        }
    }
    gameDisplay() {
        window.addEventListener('keypress', (e) => {
            const guess = String.fromCharCode(e.charCode)
            if (this.remainingGuesses > 0) {
                game1.makeGuess(guess)
                renderGame()
                game1.recalculateStatus()
                game1.statusMessage()
            }
        })
    }
    recalculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'Failed'
        } else if (finished) {
            this.status = 'Finished'
        }
    }
}

export { Hangman as default }