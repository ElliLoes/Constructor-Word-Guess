var Word = require('./Word.js');
var inquirer = require('inquirer');

var wordArray = ["Cocker Spaniel", "Dalmatian", "Finnish spitz", "German shepherd", "Irish wolfhound", "Labrador retriever", "Kuvasz", "Mastiff", "Vizsla", "Weimaraner"];
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var listLettersAlreadyGuessedArray = [];

var wordToGuess;
var slotsFilledIn = 0;

// type: () -> undefined
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
                console.log("Ok " + answers.name + ", let the game begin!");
                startGame();
            } else {
                console.log("Maybe another time...");
            }
        });
}

function startGame() {
    listLettersAlreadyGuessedArray = [];
    guessesRemaining = 10;
    wordToGuess = chooseRandomWord();
    console.log("Your word: " + wordToGuess.showWord());
    guessLetter();
    listLettersAlreadyGuessed = [];
    listLettersAlreadyGuessedArray = [];
}

// type: () -> Word
function chooseRandomWord() {
    let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    console.log(randomWord);
    return new Word(randomWord);
}

function guessLetter() {
    if (slotsFilledIn < wordToGuess.length || guessesRemaining > 0) {
        inquirer.prompt([
            {
                type: "text",
                name: "letter",
                message: "Guess a letter:"
            }
        ]).then(function (guess) {
            let guessedLetter = guess.letter.toUpperCase();
            console.log("You guessed " + guessedLetter);
            if (listLettersAlreadyGuessedArray.indexOf(guessedLetter) > -1) {
                console.log("This letter was already guessed.");
                guessLetter();
            } else {
                listLettersAlreadyGuessedArray.push(guessedLetter);
                console.log("Letters already guessed: " + listLettersAlreadyGuessedArray.join(" "));
                let userGuessedCorrectly = wordToGuess.checkGuessedLetter(guessedLetter);
                if (userGuessedCorrectly) {
                    console.log("Correct guess.");
                } else {
                    console.log("Incocrect guess.");
                }
                console.log(wordToGuess.showWord());
                checkIfUserWon();
            }
        });

    }
}

function checkIfUserWon() {
    if (guessesRemaining === 0) {
        console.log("You lost! Better luck next time!");
        losses++;
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        playAgain();
    }
    else if (wordToGuess.guessedCorrectly()) {
        console.log("You won! Congratulations!");
        wins++;
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        playAgain();
    }
    else {
        guessLetter();
    }
}

function playAgain() {
    var playAgain = [
        {
            type: "confirm",
            name: "playAgain",
            message: "Do you want to play again?",
            default: true
        }
    ];
    inquirer.prompt(playAgain).then(function (userWantsTo) {
        if (userWantsTo.playAgain) {
            startGame();
        }
    })
}

confirmStart();