
var Letter = function () {
    this.lettersOfWord = lettersOfWord.toUpperCase();
    this.letterGuessedCorrectly = false;
    this.showLetter = function () {
        if (this.letterGuessedCorrectly) {
            console.log(this.lettersOfWord);
        } else {
            console.log ("_");
        }
    }
    this.letterGuess = function (guess) {
        if (guess == this.lettersOfWord) {
            this.letterGuessedCorrectly == true;
        } else {
            return false;
        }
    }
}

module.exports = Letter;