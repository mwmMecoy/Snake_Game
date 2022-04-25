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
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id = "pixel${i}"></div>`;
  }
}