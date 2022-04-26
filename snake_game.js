//Declare global variables to track game board size
const LINE_PIXEL_COUNT = 40
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT**2

//Track scores to display to user
let totalFoodEaten = 0
let totalDistanceTraveled = 0

//Shorten reference to game board
const gameContainer = document.getElementById('gameContainer')

//Generate the game board
const createGameBoardPixels = () => {
  for (let i = 1; i<= TOTAL_PIXEL_COUNT; i++) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id = "pixel${i}"></div>`
  }
}

//Shorten references to game pixels
const gameBoardPixels = document.getElementsByClassName('gameBoardPixel')

//Create randomly generated food items in the game board
let currentFoodPosition = 0;
const createFood = () => {
    gameBoardPixels[currentFoodPosition].classList.remove('food')
    currentFoodPosition = Math.floor(Math.random()*TOTAL_PIXEL_COUNT)
    gameBoardPixels[currentFoodPosition].classList.add('food')
}

//Start setting up snake behavior
//Matching arrow keys to their input code
const LEFT_DIR = 37
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

let snakeCurrentDirection = RIGHT_DIR

//Check for valid user input and change snake direction variable
const changeDirection = newDirectionCode => {
    if(snakeCurrentDirection == newDirectionCode) return;

    //Snake can't turn 180 degrees
    if(newDirectionCode == LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR) {
        snakeCurrentDirection = newDirectionCode
    } else if(newDirectionCode == UP_DIR && snakeCurrentDirection!== DOWN_DIR) {
        snakeCurrentDirection = newDirectionCode
    } else if(newDirectionCode == RIGHT_DIR && snakeCurrentDirection!== LEFT_DIR) {
        snakeCurrentDirection = newDirectionCode
    } else if(newDirectionCode == DOWN_DIR && snakeCurrentDirection!== UP_DIR) {
        snakeCurrentDirection = newDirectionCode
    } 
}

//set starting point for snake on load
let currentHeadPosition = TOTAL_PIXEL_COUNT/2;

//Set snake starting length to use as duration for timeout
let snakeLength = 200

//start moving snake, wrap around board if leaving the container
const moveSnake = () => {
    switch(snakeCurrentDirection) {
        case LEFT_DIR:
            --currentHeadPosition
            const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0;
            if(isHeadAtLeft) {
                currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
            }
        break;
        case RIGHT_DIR:
            ++currentHeadPosition
            const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT == 0
            if(isHeadAtRight) {
                currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
            }
        break;
        case UP_DIR:
            currentHeadPosition -= LINE_PIXEL_COUNT
            const isHeadAtTop = currentHeadPosition < 0
            if(isHeadAtTop) {
                currentHeadPosition += TOTAL_PIXEL_COUNT
            }
        break;
        case DOWN_DIR:
            currentHeadPosition += LINE_PIXEL_COUNT
            const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT - 1
            if(isHeadAtBottom) {
                currentHeadPosition -= TOTAL_PIXEL_COUNT
            }
        break;
        default:
        break;
    }

    //Access next pixel in collection in direction headed
    let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition]

    //Check if snake head is intersecting with snake body, reload if true
    if(nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
        clearInterval(moveSnakeInterval);
        alert(`You have eaten ${totalFoodEaten} food and traveled ${totalDistanceTraveled} blocks!`);
        window.location.reload()
    }

    //Assuming an empty pixel, add snake body styling
    nextSnakeHeadPixel.classList.add("snakeBodyPixel")

    //Remove snake styling to keep snake correct length
    setTimeout(() => {
        nextSnakeHeadPixel.classList.remove("snakeBodyPixel")
    }, snakeLength)

    //When collecting food pixel, increment food eaten, increase length, and create new food
    if(currentHeadPosition == currentFoodPosition) {
        totalFoodEaten++
        document.getElementById("pointsEarned").innerText = totalFoodEaten
        snakeLength += 100
        createFood()
    }

    //added distance traveled counter
    totalDistanceTraveled++
    document.getElementById('blocksTraveled').innerText = totalDistanceTraveled
}

//Call initial functions to create board and start game.
createGameBoardPixels();

createFood();

//Set animation speed
let moveSnakeInterval = setInterval(moveSnake, 100)

addEventListener("keydown", e => changeDirection(e.keyCode))

//Add variables for on-screen buttons
const leftButton = document.getElementById('leftButton')
const rightButton = document.getElementById('rightButton')
const upButton = document.getElementById('upButton')
const downButton = document.getElementById('downButton')

//pass input depending on click, listeners
leftButton.onclick = () => changeDirection(LEFT_DIR)
rightButton.onclick = () => changeDirection(RIGHT_DIR)
upButton.onclick = () => changeDirection(UP_DIR)
downButton.onclick = () => changeDirection(DOWN_DIR)