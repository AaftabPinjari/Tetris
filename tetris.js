document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10;
    const SquareDisplay = document.querySelector('#score')
    const StartButton = document.querySelector('#start-button')

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

    //assigning functions to keycodes
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        }
        else if (e.keyCode === 39) {
            moveRight()
        }
        else if (e.keyCode === 38) {
            //sds
        }
        else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keydown', control)

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
    timeId = setInterval(moveDown, 1000)




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
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
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
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if (!isAtRightEdge) { currentPosition += 1 }

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }
        draw()
    }






})