"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt = require('prompt-sync')();
function App() {
    var Game = /** @class */ (function () {
        function Game() {
            this.lettersGuessed = [];
            this.attempts = 0;
            this.maxAttempts = 6;
        }
        return Game;
    }());
    var wordList = ['typescript', 'javascript', 'react', 'python', 'django'];
    var getWord = function () {
        var currentGameWord = new Game();
        currentGameWord.secretWord = wordList[Math.floor(Math.random() * wordList.length)];
        var displayWord = '';
        for (var dashes = 0; dashes < currentGameWord.secretWord.length; dashes++) {
            displayWord += '_';
        }
        console.log(displayWord);
        currentGameWord.displayedWord = displayWord;
        return currentGameWord;
    };
    var updatedDisplayWord = function (secretWord, guessedLetter, currentDisplayWord) {
        var displayedLetters = currentDisplayWord.split('');
        for (var index = 0; index < secretWord.length; index++) {
            if (secretWord[index] === guessedLetter) {
                displayedLetters[index] = secretWord[index];
            }
        }
        return displayedLetters.join('');
    };
    var Play = function () {
        var currentGameWord = getWord();
        while (currentGameWord.attempts < currentGameWord.maxAttempts && currentGameWord.displayedWord.includes('_')) {
            var guess = prompt('Guess a letter: ');
            if (currentGameWord.lettersGuessed.includes(guess)) {
                console.log('You already guessed that letter.');
            }
            currentGameWord.lettersGuessed.push(guess);
            console.log('You guessed:', guess);
            console.log('Guessed letters:', currentGameWord.lettersGuessed);
            if (currentGameWord.secretWord.includes(guess)) {
                console.log('Correct guess!');
                currentGameWord.displayedWord = updatedDisplayWord(currentGameWord.secretWord, guess, currentGameWord.displayedWord);
            }
            else {
                currentGameWord.attempts++;
                console.log('Incorrect guess!');
            }
            console.log('Current word:', currentGameWord.displayedWord);
            console.log('Attempts remaining:', currentGameWord.maxAttempts - currentGameWord.attempts);
        }
        if (!currentGameWord.displayedWord.includes('_')) {
            console.log('Congratulations! You guessed the word: ', currentGameWord.secretWord);
        }
        else {
            console.log('You ran out of attempts. The word was: ', currentGameWord.secretWord);
        }
    };
    Play();
}
App();
exports.default = App;
