var Letter = require("./letter.js");

// type: (string) -> Word
var Word = function (word) {
    this.letters = []; // type: Array<Letter>
    for (var i = 0; i < word.length; i++) {
        // type of Letter constructor: (string) -> Letter
        // type of String.prototype.charAt: (number) -> string
        this.letters.push(new Letter(word.charAt(i)));
    }

    /**
     * Returns a string representing the word.
     */
    // type: () -> string
    this.currentWord = function () {
        var letterCharacter = "";
        for (var i=0; i < this.letters.length; i++) {
            letterCharacter += this.letters[i].showLetter() + " ";
        }
        return letterCharacter;
    };

    /**
     * Checks the guessed letter against the word.
     */
    // type: (string) -> undefined
    this.checkGuessedLetter = function (guessedLetter) {
        var correctAnswer = false;
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].letterGuess(guessedLetter)) {
                correctAnswer = true;
            }
        }
        return correctAnswer;
    };
};

module.exports = Word;

// var newWord = new Word("hallo"); // type: Word

// var stringArray = ['hello', 'world'] // type: Array<string>
// var numberArray = [1, 2, 3] // type: Array<number>
// var numberArray = [1, "2", 3] // type: Array<number | string>