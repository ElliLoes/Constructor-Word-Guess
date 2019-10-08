var Letter = require("./letter.js");

var Word = function () {
    this.wordLetters = [];

    this.currentWord = function () {
        var letterCharacter = "";
        for (var i=0; i < this.wordLetters.length; i++) {
            letterCharacter += this.wordLetters[i].showLetter() + " ";
        }
        return letterCharacter;
    }

    this.checkGuessedLetter = function (guessedLetter) {
        var correctAnswer = false;
        for (var i = 0; i < this.wordLetters.length; i++) {
            if (this.wordLetters[i].letterGuess(guessedLetter)) {
                correctAnswer = true;
            }
        }
        return correctAnswer;
    }

    this.addLetters = function (letterArray) {
        for (var i = 0; i < letterArray.length; i ++) {
            this.wordLetters.push(new Letter(letterArray[i]));
        }
    }


}

module.exports = Word;