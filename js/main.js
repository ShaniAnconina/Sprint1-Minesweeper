const FLAG = '🚩'
const MINE = '💣'
const EMPTY = ' '

var gBoard
var gStartTime
var gTimeInterval
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gLevel = { size: 4, mines: 2 }
var gClicksCount


function initGame() {
   gClicksCount = 0
   document.querySelector('.time').innerText = '00:00'
   gBoard = buildBoard()
   getRandomMines(gLevel.mines)
   countNegs(gBoard)
   renderBoard(gBoard)
}


function cellClicked(elCell, i, j) {
   gClicksCount++
   gBoard[i][j].isShown = true
   if (gClicksCount === 1) {
      startTimer()
      if (gBoard[i][j].isMine) return
   }
   renderBoard(gBoard)
   checkGameOver()
}


function cellMarked(elCell, i, j) {
   // Called on right click to mark a cell (suspected to be a mine)
   gClicksCount++
   if (gClicksCount === 1) startTimer()
   if (gBoard[i][j].isMarked === false) {
      gBoard[i][j].isMarked = true
      elCell.innerText = `${FLAG}`
   } else {
      gBoard[i][j].isMarked = false
      elCell.innerText = `${EMPTY}`
   }
}


function onChooseLevel(size = 4, mines = 2) {
   gLevel.size = size
   gLevel.mines = mines
   clearInterval(gTimeInterval)
   initGame()
}


function checkGameOver(elCell, i, j) {
   if (gBoard[i][j].isMine) {
      GameOver()
      // for (var i = 0; i < gLevel.size; i++) {
      //    for (var j = 0; j < gLevel.size; j++) {
      //       if (gBoard[i][j].isMine) {
      //          gBoard[i][j].isShown = true
      //       }
      //    }
      // }
   }
}

function GameOver() {
   clearInterval(gTimeInterval)
   document.querySelector('.time').style.color = 'red'
   document.querySelector('.game-over').display = 'inline-block'
   if (isVictory()) {
      document.querySelector('.game-over').innerText = 'YOU WON!'
   }
}

function isVictory() {

}