var Word = require('./Word.js');
var inquirer = require('inquirer');

var wordArray = ["Cocker Spaniel", "Dalmatian", "Finnish spitz", "German shepherd", "Irish wolfhound", "Labrador retriever", "Kuvasz", "Mastiff", "Vizsla", "Weimaraner"];
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var listLettersAlreadyGuessed = "";
var listLettersAlreadyGuessedArray = [];

var randomWord;
var someWord;
var userGuessedCorrectly= false;
var slotsFilledIn = 0;


function confirmStart() {
    var readyToStart = [
        {
            type: "text",
            name: "name",
            message: "Hi! What's your name?"
        },
        {
            type: "confirm",
            name: "readyToPlay",
            message: "Are you ready to start the game?",
            default: true
        }
    ];

    inquirer.prompt(readyToStart)
        .then(function (answers) {
            if (answers.readyToPlay) {
                console.log("Let the game begin!");
                startGame();
            } else {
                console.log("Maybe another time..");
                return;
            }
        });
}

function startGame() {
    guessesRemaining = 10;
    chooseRandomWord();
    listLettersAlreadyGuessed = [];
    listLettersAlreadyGuessedArray = [];
}

function chooseRandomWord() {
    randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    someWord = new Word(randomWord);
    console.log("Your words contains " + randomWord.length + " letters.");
    someWord.splitWord();
    someWord.generateLetters();
    guessLetter();
}

function guessLetter() {
    if (slotsFilledIn < someWord.letters.length || guessesRemaining > 0) {
        inquirer.prompt([
            {
                name: "letter",
                message: "Guess a letter:"
            }
        ]).then(function (guess) {
            guess.letter.toUpperCase();
            console.log("You guessed " + guess.letter.toUpperCase());
            userGuessedCorrectly = false;
            if (listLettersAlreadyGuessedArray.indexOf(guess.letter.toUpperCase()) > -1) {
                console.log("This letter was already guessed.");
                guessLetter();
            } else if (listLettersAlreadyGuessedArray.indexOf(guess.letter.toUpperCase()) === -1) {
                listLettersAlreadyGuessed = listLettersAlreadyGuessed.concat(" " + guess.letter.toUpperCase());
                listLettersAlreadyGuessedArray.push(guess.letter.toUpperCase());
                console.log("Letters already guessed: " + listLettersAlreadyGuessed);
                for (i=0; i < someWord.letters.length; i++) {
                    if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].charactersCorrectlyGuessed === false) {
                        someWord.letters[i].charactersCorrectlyGuessed === true;
                        userGuessedCorrectly = true;
                        someWord.underscores[i] = guess.letter.toUpperCase();
                        slotsFilledIn++;
                    }
                }
                if (userGuessedCorrectly) {
                    console.log("Correct guess.");
                    checkIfUserWon();
                } else {
                    console.log("Incocrect guess.");
                }
            } 
        });

}
} 

function checkIfUserWon () {
    if (guessesRemaining === 0) {
        console.log("You lost! Better luck next time!");
        losses++;
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        playAgain();
    }
    else if (slotsFilledIn === someWord.letters.length) {
        console.log("You won! Congratulations!");
        wins++;
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        playAgain();
    }
    else {
        guessLetter("");
    }
}

function playAgain () {
    var playAgain = [
        {
            type: "confirm",
            name: "playAgain",
            message: "Do you want to play again?",
            default: true
        }
    ];
    inquirer.prompt(playAgain).then(function(userWantsTo) {
        if (userWantsTo.playAgain) {
            listLettersAlreadyGuessed = "";
            listLettersAlreadyGuessedArray = [];
            slotsFilledIn = 0;
            startGame();
        } else {
            return;
        }
    })
}

