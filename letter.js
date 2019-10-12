
// type: (string) -> Letter
var Letter = function (letter) {
    this.letter = letter.toUpperCase(); // type: string
    this.letterGuessedCorrectly = " " === letter;

    // type: () -> string
    this.showLetter = function () {
        if (this.letterGuessedCorrectly) {
           return this.letter;
        } else {
            return "_";
        }
    };
    
    /**
     * returns 'true' if the guess was correct
     */
    // type: (string) -> boolean
    this.letterGuess = function (guess) {
        if (guess == this.letter) {
            this.letterGuessedCorrectly = true;
            return true;
        } else {
            return false;
        }
    };
};

module.exports = Letter;

