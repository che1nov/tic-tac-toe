const statusElement = document.getElementById('status');
const boardElement = document.getElementById('board');

let currentPlayer = 'X'; // Текущий игрок
let gameState = Array(9).fill(null); // Состояние игрового поля

// Создание игрового поля
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => makeMove(i));
    boardElement.appendChild(cell);
}

// Обработка хода
function makeMove(index) {
    if (gameState[index] || checkWinner()) return;

    // Выполняем ход
    gameState[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].textContent = currentPlayer;
    document.querySelectorAll('.cell')[index].classList.add(currentPlayer);

    // Проверяем победителя
    if (checkWinner()) {
        statusElement.textContent = `Игрок ${currentPlayer} победил!`;
        disableBoard();
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        statusElement.textContent = 'Ничья!';
        disableBoard();
        return;
    }

    // Меняем игрока
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Ход игрока ${currentPlayer}`;
}

// Проверка победителя
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // строки
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // столбцы
        [0, 4, 8], [2, 4, 6]             // диагонали
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Отключение поля после завершения игры
function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
}

// Сброс игры
function resetGame() {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    statusElement.textContent = `Ход игрока ${currentPlayer}`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.style.pointerEvents = 'auto';
    });
}

// Кнопка "Начать заново"
document.getElementById('resetButton').addEventListener('click', resetGame);