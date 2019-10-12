const Word = require('./Word.js');
const inquirer = require('inquirer');

const wordArray = ["Cocker Spaniel", "Dalmatian", "Finnish spitz", "German shepherd", "Irish wolfhound", "Labrador retriever", "Kuvasz", "Mastiff", "Vizsla", "Weimaraner"];
let wins = 0;
let losses = 0;
let guessesRemaining = 10;
let listLettersAlreadyGuessedArray = []; // type: array<string>

let wordToGuess; // type: Word

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
    console.log("-------------------------------------");
    guessLetter();
}

// type: () -> Word
function chooseRandomWord() {
    let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)]; // type: string
    return new Word(randomWord);
}

function guessLetter() {
    inquirer.prompt([
        {
            type: "text",
            name: "letter",
            message: "Guess a letter:"
        }
    ]).then(function (guess) {
        let guessedLetter = extractFirstLetter(guess.letter);
        console.log("You guessed " + guessedLetter);
        if (listLettersAlreadyGuessedArray.indexOf(guessedLetter) > -1) {
            console.log("This letter was already guessed.");
            console.log("-------------------------------------");
            guessLetter();
        } else {
            listLettersAlreadyGuessedArray.push(guessedLetter);
            let userGuessedCorrectly = wordToGuess.checkGuessedLetter(guessedLetter);
            if (userGuessedCorrectly) {
                console.log("Correct guess.");
                console.log("-------------------------------------");
            } else {
                console.log("Incorrect guess.");
                console.log("-------------------------------------");
                guessesRemaining--;
            }
            console.log("Guesses remaining: " + guessesRemaining + "\nLetters already guessed: " + listLettersAlreadyGuessedArray.join(" "));
            console.log("-------------------------------------");
            console.log(wordToGuess.showWord() + "\n");
            checkIfUserWon();
        }
    });
}

// type: (string) -> string
function extractFirstLetter(value) {
    let letterOnly = value.replace(/\W|\d/g, '');
    let firstLetter = letterOnly.substring(0, 1);
    let guessedLetter = firstLetter.toUpperCase();
    return guessedLetter;
}

function checkIfUserWon() {
    if (guessesRemaining === 0) {
        console.log("You lost! The correct word was " + wordToGuess.word + "!\nBetter luck next time!");
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