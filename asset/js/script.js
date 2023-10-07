const cards = document.querySelectorAll('.memory-card');
const infoVictory = document.querySelector('.victory');
const buttonreload = infoVictory.querySelector('button');
const spanAttempt = infoVictory.querySelector('.attempt');
const sectionStatistic = document.querySelector('.statistic');
const buttonStatistic = document.querySelector('.buttonStatistic');

const buttonExit = sectionStatistic.querySelector('.buttonExit');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let count = 0;
let attempt = 0;

function victory() {
    infoVictory.classList.add('active');
    document.body.classList.add('_lock');

    spanAttempt.textContent = 'Вам потребовалось ' + attempt + ' парная(ых) открытий';
    //  Потребовалось attempt парных открытий
}

buttonreload.addEventListener('click', (e) => {
    infoVictory.classList.remove('active');
    document.body.classList.remove('_lock');
    cards.forEach(card => {
        card.classList.remove('flip')
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
});

buttonStatistic.addEventListener('click', (e) => {
    sectionStatistic.classList.add('active');
    document.body.classList.add('_lock');
});

buttonExit.addEventListener('click', (e) => {
    sectionStatistic.classList.remove('active');
    document.body.classList.remove('_lock');
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //нажал на карту первый раз
        hasFlippedCard = true;
        firstCard = this;
        return;
    };
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();

}

function checkForMatch() {

    attempt++

    //console.log(attempt);

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disabledCards() : unflipCards();

    // if(firstCard.dataset.framework === secondCard.dataset.framework){
    //     disabledCards();
    // } else {
    //     unflipCards();
    // }

}

function disabledCards() {
    count++;

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if (count == 6) {
        victory();
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


//  Обрати внимание, что в начале начинается скобкой, а в конце закрывается и еще одна пара скобок
//  это вызываемое функциональное выражение, та функция будет выполнена сразуже при ее определении

(function shuffle() {

    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })

})();

cards.forEach(card => card.addEventListener('click', flipCard));

function getLocalStorage() {
    let statistics = localStorage.getItem('statistics');
    if (statistics === null) {
        //statistics = ''
    } else {
        //getTranslate(lang);
        getStatistic(statistics);
    }
}

function getStatistic(statistics) {
    console.log('1234');
}

window.addEventListener('load', getLocalStorage);

