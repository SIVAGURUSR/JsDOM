const cardscontainer= [
    { name: 'A', value: 'A' },
    { name: 'B', value: 'B' },
    { name: 'C', value: 'C' },
    { name: 'D', value: 'D' },
    { name: 'E', value: 'E' },
    { name: 'F', value: 'F' },
    { name: 'G', value: 'G' },
    { name: 'H', value: 'H' },
    { name: 'A', value: 'A' },
    { name: 'B', value: 'B' },
    { name: 'C', value: 'C' },
    { name: 'D', value: 'D' },
    { name: 'E', value: 'E' },
    { name: 'F', value: 'F' },
    { name: 'G', value: 'G' },
    { name: 'H', value: 'H' }
];

let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
function flipgame(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    flipgame(cardscontainer).forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.innerText = card.value;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === cardscontainer.length / 2) {
            setTimeout(showCustomAlert, 500);
        }
    } else {
        unflipCards();
    }
}

function showCustomAlert() {
    const modal = document.getElementById('customAlert');
    modal.style.display = 'block';

    document.getElementById('closeModal').onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

const resetBoard = () => {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.getElementById('restartButton').addEventListener('click', () => restartGame());

const restartGame = () => {
    matchedPairs = 0;
    resetBoard();
    createBoard();
}

createBoard();