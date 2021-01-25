document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    const squares = [];
    const bombsAmount = 20;
    let isGameOver = false;

    function createBoard() {
        //get shuffled game array with random bombs
        const squaresOnField = width*width;
        const bombsArray = Array(bombsAmount).fill('bomb');
        const emptyArray = Array(squaresOnField - bombsAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(()=> Math.random() - 0.5);
    

        for (let i = 0; i < squaresOnField; i++) {
            const square = document.createElement('div');
            square.setAttribute('id' , i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);
        }

        //normal click
        grid.addEventListener('click', function(e) {
            clickHandler(e.target);
        });

        //add numbers
        for (let i = 0; i < squares.length; i++) {
            const isLeftEdge = (i % width) === 0;
            const isRightEdge = (i % width) === width - 1; 
            let totalBombs = 0;

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) { //left square
                    totalBombs++;
                }
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) {  //right-top
                    totalBombs++;
                }
                if (i > 9 && squares[i - width].classList.contains('bomb')) { //top
                    totalBombs++;
                }
                if (i > 10 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) { //left-top
                    totalBombs++;
                }
                if (i < 99 && !isRightEdge && squares[i + 1].classList.contains('bomb')) { //right
                    totalBombs++;
                }
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) { // left-bottom
                    totalBombs++;
                }
                if (i < 89 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) { //right-bottom
                    totalBombs++;
                }
                if (i < 90 && squares[i + width].classList.contains('bomb')) { //bottom
                    totalBombs++;
                }
                squares[i].setAttribute('data', totalBombs);
            }
        }
        console.log(squares);

    };

    createBoard();


    // click on square actions
    function clickHandler(square) {
        const squareWithBomb = square.classList.contains('bomb');
        let currentId = square.id;

        if (isGameOver) {
            return;
        }
        if (square.classList.contains('check') || square.classList.contains('flag')) {
            return;
        }

        if (squareWithBomb) {
            console.log('Game Over');
        } else {
            const total = square.getAttribute('data');
            if (total !== '0') {
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add('checked');
    }


    // check neighboring squares once square is clicked
    function checkSquare (square, currentId) {
        const isLeftEdge = (currentId % width) === 0;
        const isRightEdge = (currentId % width) === width - 1;

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                clickHandler(newSquare, newId);
            }
        }, 10)
    }
});



