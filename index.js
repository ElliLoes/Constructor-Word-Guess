var Word = require('./Word.js');
var inquirer = require('inquirer');

var wordArray = ["Cocker Spaniel", "Dalmatian", "Finnish spitz", "German shepherd", "Irish wolfhound", "Labrador retriever", "Kuvasz", "Mastiff", "Vizsla", "Weimaraner"];
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var listLettersAlreadyGuessed = "";
var listLettersAlreadyGuessedArray = [];

var wordToGuess;
var userGuessedCorrectly = false;
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

    // inquirer.prompt(readyToStart)
    //     .then(function (answers) {
    //         if (answers.readyToPlay) {
    //             console.log("Ok " + answers.name + ", let the game begin!");
                startGame();
        //     } else {
        //         console.log("Maybe another time...");
        //     }
        // });
}

function startGame() {
    guessesRemaining = 10;
    wordToGuess = chooseRandomWord();
    console.log("Your word contains " + wordToGuess.length + " letters.");
    guessLetter();
    listLettersAlreadyGuessed = [];
    listLettersAlreadyGuessedArray = [];
}

// type: () -> Word
function chooseRandomWord() {
    let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
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
            userGuessedCorrectly = false;
            if (listLettersAlreadyGuessedArray.indexOf(guessedLetter) > -1) {
                console.log("This letter was already guessed.");
                guessLetter();
            } else {
                listLettersAlreadyGuessedArray.push(guessedLetter);
                console.log("Letters already guessed: " + listLettersAlreadyGuessedArray...(" "));
                for (i = 0; i < wordToGuess.letters.length; i++) {
                    if (guess.letter.toUpperCase() === wordToGuess.letters[i].character && wordToGuess.letters[i].charactersCorrectlyGuessed === false) {
                        wordToGuess.letters[i].charactersCorrectlyGuessed === true;
                        userGuessedCorrectly = true;
                        wordToGuess.underscores[i] = guess.letter.toUpperCase();
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

function checkIfUserWon() {
    if (guessesRemaining === 0) {
        console.log("You lost! Better luck next time!");
        losses++;
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        playAgain();
    }
    else if (slotsFilledIn === wordToGuess.letters.length) {
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
            listLettersAlreadyGuessed = "";
            listLettersAlreadyGuessedArray = [];
            slotsFilledIn = 0;
            startGame();
        } else {
            return;
        }
    })
}

confirmStart();