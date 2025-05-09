const prompt = require('prompt-sync')()

function App() {
    class Game {
        secretWord      : string
        lettersGuessed  : string[]  = []
        attempts        : number    = 0
        maxAttempts     : number    = 6
        displayedWord   : string
    }

    const wordList = ['typescript', 'javascript', 'react', 'python', 'django']


    const getWord = () => {
        const currentGameWord = new Game()
        currentGameWord.secretWord = wordList[Math.floor(Math.random() * wordList.length)]
        
        let displayWord = ''
        for (let dashes = 0; dashes < currentGameWord.secretWord.length; dashes++) {
            displayWord += '_'
        }
        console.log(displayWord)
        currentGameWord.displayedWord = displayWord
        return currentGameWord
    }


    const updatedDisplayWord = (secretWord: string, guessedLetter: string, currentDisplayWord: string) => {
        const displayedLetters = currentDisplayWord.split('')
        for (let index = 0; index < secretWord.length; index++) {
            if (secretWord[index] === guessedLetter) {
                displayedLetters[index] = secretWord[index]
            }
        }

        return displayedLetters.join('')
    }


    const Play = () => {
        const currentGameWord = getWord()

        while (currentGameWord.attempts < currentGameWord.maxAttempts && currentGameWord.displayedWord.includes('_')) {
            const guess = prompt('Guess a letter: ')

            if (currentGameWord.lettersGuessed.includes(guess)) {
                console.log('You already guessed that letter.')
            }
            currentGameWord.lettersGuessed.push(guess)
            console.log('You guessed:', guess)
            console.log('Guessed letters:', currentGameWord.lettersGuessed)

            if (currentGameWord.secretWord.includes(guess)) {
                console.log('Correct guess!')
                currentGameWord.displayedWord = updatedDisplayWord(
                    currentGameWord.secretWord,
                    guess,
                    currentGameWord.displayedWord
                )
            } else {
                currentGameWord.attempts++
                console.log('Incorrect guess!')
            }

            console.log('Current word:', currentGameWord.displayedWord)
            console.log('Attempts remaining:', currentGameWord.maxAttempts - currentGameWord.attempts)
        }
        
        if (!currentGameWord.displayedWord.includes('_')) {
            console.log('Congratulations! You guessed the word:', currentGameWord.secretWord)
        } else {
            console.log('You ran out of attempts. The word was:', currentGameWord.secretWord)
        }
    }

    Play()
}

App()

export default App