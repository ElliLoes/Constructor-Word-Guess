var Letter = require("./letter.js");

// type: (string) -> Word
var Word = function (word) {
    this.letters = []; // type: Array<Letter>
    this.length = word.length; // type: number
    this.word = word;
    for (var i = 0; i < word.length; i++) {
        // type of String.prototype.charAt: (number) -> string
        let character = word.charAt(i); // type: string
        // type of Letter constructor: (string) -> Letter
        let letter = new Letter(character); // type: Letter
        this.letters.push(letter); // type: number
    }

    /**
     * Returns a string representing the word.
     */
    // type: () -> string
    this.showWord = function () {
        var letterCharacter = ""; // type: string
        for (var i=0; i < this.letters.length; i++) {
            letterCharacter += this.letters[i].showLetter() + " ";
        }
        return letterCharacter;
    };

    /**
     * Checks the guessed letter against the word and returns 'true' if any letter was guessed correctly.
     */
    // type: (string) -> boolean
    this.checkGuessedLetter = function (guessedLetter) {
        let letterGuessedCorrectly = false;
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].letterGuess(guessedLetter)) {
                letterGuessedCorrectly = true;
            }
        }
        return letterGuessedCorrectly;
    };

    /**
     * return 'true' if all leters were guessed correctly
     */
    // type: () -> boolean
    this.guessedCorrectly = function() {
        for (var i = 0; i < this.letters.length; i++) {
            if (!this.letters[i].letterGuessedCorrectly) {
                return false;
            }
        }
        return true;
    }
};

module.exports = Word;

