let sequence = [];
let playerSequence = [];
let score = 0;
let username = '';

const colors = ["red", "green", "blue", "yellow"];
const audioFiles = {
   red: new Audio('audio/do-80236.mp3'),
   green: new Audio('audio/fa-78409.mp3'),
   blue: new Audio('audio/mi-80239.mp3'),
   yellow: new Audio('audio/re-78500.mp3'),
};

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', restartGame); // Solo evento para el botón de reinicio

function startGame() {
   username = document.getElementById('username').value;
   if (!username) {
       alert('Por favor, ingresa tu nombre.');
       return;
   }
   document.getElementById('menu').style.display = 'none';
   document.getElementById('game').style.display = 'block';
   nextRound();
}

function nextRound() {
   playerSequence = [];
   const randomColor = colors[Math.floor(Math.random() * colors.length)];
   sequence.push(randomColor);
   playSequence();
}

function playSequence() {
   let i = 0;
   const interval = setInterval(() => {
       if (i >= sequence.length) {
           clearInterval(interval);
           return;
       }
       illuminateButton(sequence[i]);
       i++;
   }, 1000); // Intervalo de 1 segundo
}

function saveScore() {
   let scores = JSON.parse(localStorage.getItem('scores')) || {};
   if (!scores[username]) {
       scores[username] = 0;
   }
   if (score > scores[username]) {
       scores[username] = score;
   }
   localStorage.setItem('scores', JSON.stringify(scores));
}

function illuminateButton(color) {
   const button = document.getElementById(color);
   button.classList.add('active');
   audioFiles[color].play();
   setTimeout(() => {
       button.classList.remove('active');
   }, 500); // Cambia a 500 ms para que el botón se ilumine por medio segundo
}

document.querySelectorAll('.color-button').forEach(button => {
   button.addEventListener('click', () => {
       const color = button.id;
       illuminateButton(color); // Ilumina el botón al hacer clic
       playerSequence.push(color);
       checkSequence();
   });
});

function checkSequence() {
   const lastIndex = playerSequence.length - 1;
   if (playerSequence[lastIndex] !== sequence[lastIndex]) {
       alert('Juego Terminado. Tu puntuación: ' + score);
       saveScore();
       restartGame();
   } else if (playerSequence.length === sequence.length) {
       score++;
       document.getElementById('score').innerText = 'Puntuación: ' + score;
       nextRound();
   }
}

function restartGame() {
   sequence = [];
   score = 0;
   document.getElementById('score').innerText = 'Puntuación: 0';
   document.getElementById('menu').style.display = 'block';
   document.getElementById('game').style.display = 'none';
}

document.getElementById('showVictories').addEventListener('click', showScores);

function showScores() {
   const scores = JSON.parse(localStorage.getItem('scores')) || {};
   let scoreList = 'Mejores Puntajes:\n';
   for (const user in scores) {
       scoreList += `${user}: ${scores[user]}\n`;
   }
   alert(scoreList);
}