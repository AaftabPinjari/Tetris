document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    const width = 10;
    let nextRandom = 0
    let timeId
    let score = 0


    //assigning functions to keycodes
    function controls(e) {
        if (e.keyCode === 37) {
            moveLeft()
        }
        if (e.keyCode === 39) {
            moveRight()
        }
        if (e.keyCode === 40) {
            moveDown()
        }
        if (e.keyCode === 38) {
            rotate()
        }
    }
    document.addEventListener('keyup', controls)
    //each tetrimino 
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0
    //randomly selecting the tetromino
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]




    //drawing first rotation for first tetromino

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')

        })
    }
    //undrawing the rotation
    function unDraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }


    //tetromino down movement




    //movedown function
    function moveDown() {
        unDraw()
        currentPosition = currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //new tetromino
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    //move left function
    function moveLeft() {
        unDraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if (!isAtLeftEdge) currentPosition -= 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1

        }

        draw()
    }

    function moveRight() {
        unDraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if (!isAtRightEdge) { currentPosition += 1 }

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    //rotating the tetromino

    function rotate() {
        unDraw()
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        Draw()
    }
    //display grid

    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    //first index of eaach tetromino

    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],// ltetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // ztetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2],// tTetromino
        [0, 1, displayWidth, displayWidth + 1],//oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
    ]

    //display shapes in grid

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }

    //start/pause btn
    startButton.addEventListener('click', () => {
        if (timeId) {
            clearInterval(timeId)
            timeId = null
        } else {
            draw()
            timeId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })
    // score

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i = 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }
    //game over
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timeId)
        }
    }

})