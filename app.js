var prompt = require('prompt-sync')();
var HangmanGame = /** @class */ (function () {
    function HangmanGame(word, attempts) {
        this.wordToGuess = word.toUpperCase();
        this.guessedLetters = [];
        this.attemptsLeft = attempts;
        console.log("Welcome to Hangman!");
        this.displayGameState();
    }
    HangmanGame.prototype.displayGameState = function () {
        var display = "";
        for (var _i = 0, _a = this.wordToGuess; _i < _a.length; _i++) {
            var letter = _a[_i];
            if (this.guessedLetters.includes(letter)) {
                display += letter + " ";
            }
            else {
                display += "_ ";
            }
        }
        console.log("Word: ".concat(display.trim()));
        console.log("Guessed letters: ".concat(this.guessedLetters.join(", ") || "None"));
        console.log("Attempts left: ".concat(this.attemptsLeft));
    };
    HangmanGame.prototype.getGuess = function () {
        var _a;
        var guess = (_a = prompt("Guess a letter: ")) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        if (guess && /^[A-Z]$/.test(guess) && !this.guessedLetters.includes(guess)) {
            return guess;
        }
        else if (guess && this.guessedLetters.includes(guess)) {
            console.log("You've already guessed that letter.");
            return this.getGuess(); // Ask again
        }
        else {
            console.log("Invalid guess. Please enter a single letter (A-Z).");
            return this.getGuess(); // Ask again
        }
    };
    HangmanGame.prototype.playRound = function () {
        var guess = this.getGuess();
        if (!guess) {
            return false; // Should not happen due to the loop in getGuess, but for type safety
        }
        this.guessedLetters.push(guess);
        if (!this.wordToGuess.includes(guess)) {
            this.attemptsLeft--;
            console.log("Incorrect guess!");
        }
        this.displayGameState();
        if (this.attemptsLeft === 0) {
            console.log("You ran out of attempts! The word was: ".concat(this.wordToGuess));
            return true; // Game over, player lost
        }
        if (this.isWordGuessed()) {
            console.log("Congratulations! You guessed the word!");
            return true; // Game over, player won
        }
        return false; // Game not over
    };
    HangmanGame.prototype.isWordGuessed = function () {
        for (var _i = 0, _a = this.wordToGuess; _i < _a.length; _i++) {
            var letter = _a[_i];
            if (!this.guessedLetters.includes(letter)) {
                return false;
            }
        }
        return true;
    };
    HangmanGame.prototype.playGame = function () {
        console.log("Let's play Hangman!");
        while (!this.playRound()) {
            // Continue playing rounds until the game is over
        }
    };
    return HangmanGame;
}());
function main() {
    var wordList = ["JAVASCRIPT", "TYPESCRIPT", "TERMINAL", "GAME", "PROGRAMMING"];
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var chosenWord = wordList[randomIndex];
    var maxAttempts = 6;
    var game = new HangmanGame(chosenWord, maxAttempts);
    game.playGame();
}
main();
