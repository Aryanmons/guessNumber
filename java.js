let randomnumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userinput = document.querySelector('#guessField');
const guessslot = document.querySelector('.guesses');
const lastres = document.querySelector('.lastResult');
const low_high = document.querySelector('.lowOrHi');
const startover = document.querySelector('.resultParas');

const p = document.createElement('p');
let prevGuess = [];
let attempts = 1;

let playgame = true;

if (playgame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault(); // stop the values
        const guess = parseInt(userinput.value);
        validateguess(guess);
    });
}

function validateguess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number.');
    } else if (guess < 1 || guess > 100) {
        alert('Please enter a value between 1 and 100.');
    } else {
        prevGuess.push(guess);
        if (attempts == 11) {
            cleanupguess(guess);
            displaymessage(`Game over. Random Number was ${randomnumber}`);
            endgame();
        } else {
            cleanupguess(guess);
            checkguess(guess);
        }
    }
}

function checkguess(guess) {
    if (guess == randomnumber) {
        displaymessage(`You guessed it! Wohooo!`);
        endgame();
    } else if (guess > randomnumber) {
        displaymessage(`Number is too high`);
    } else if (guess < randomnumber) {
        displaymessage(`Number is too low`);
    }
}

function displaymessage(message) {
    low_high.innerHTML = `<h2>${message}</h2>`;
}

function cleanupguess(guess) {
    userinput.value = '';
    guessslot.innerHTML += `${guess}  `;
    attempts++;
    lastres.innerHTML = `${11 - attempts}`;
}

function newgame() {
    const newgamebutton = document.querySelector('#newGame');
    newgamebutton.addEventListener('click', function (e) {
        randomnumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        attempts = 1;
        guessslot.innerHTML = '';
        lastres.innerHTML = `${11 - attempts}`;
        userinput.removeAttribute('disabled', '');
        startover.removeChild(p);
        playgame = true;
    });
}

function endgame() {
    userinput.value = '';
    userinput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startover.appendChild(p);
    playgame = false;
    newgame();
}
