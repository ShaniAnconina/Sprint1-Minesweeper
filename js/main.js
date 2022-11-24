const FLAG = '🚩'
const MINE = '💣'
const EMPTY = ' '

var gBoard
var gStartTime
var gTimeInterval
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gLevel = { size: 4, mines: 2 }
var gClicksCount
var firstCLickTimer
var firstCLickMines

function initGame() {
   gGame.isOn = true
   firstCLickTimer = true
   firstCLickMines = true
   document.querySelector('.time').innerText = '00:00'
   document.querySelector('.time').style.color = 'black'
   gBoard = buildBoard()
   renderBoard(gBoard)
}

function cellClicked(elCell, i, j) {
   startTimer()
   if (firstCLickMines) {
      getRandomMines(gLevel.mines, i, j)
      countNegs(gBoard)
      firstCLickMines = !firstCLickMines
   }
   if (gGame.isOn === false) return
   if (gBoard[i][j].isMarked) return
   gBoard[i][j].isShown = true
   if (!gBoard[i][j].minesAroundCount) expandShown(gBoard, elCell, i, j)
   renderBoard(gBoard)
   if (!firstCLickMines) checkGameOver(i, j)
}

function cellMarked(elCell, i, j) {
   if (gGame.isOn === false) return
   if (gBoard[i][j].isShown) return
   startTimer()
   if (gBoard[i][j].isMarked === false) {
      gBoard[i][j].isMarked = true
      elCell.innerText = `${FLAG}`
   } else {
      gBoard[i][j].isMarked = false
      elCell.innerText = `${EMPTY}`
   }
   isVictory()
}

function onChooseLevel(size = 4, mines = 2) {
   gLevel.size = size
   gLevel.mines = mines
   clearInterval(gTimeInterval)
   initGame()
}

function checkGameOver(i, j) {
   if (gBoard[i][j].isMine) {
      GameOver()
   } else if (!gBoard[i][j].isMine) {
      isVictory()
   }

}

function GameOver() {
   gGame.isOn = false
   clearInterval(gTimeInterval)
   revealAllMines()
   document.querySelector('.time').style.color = 'red'
   document.querySelector('.game').style.display = 'inline-block'
}

function isVictory() {
   for (var i = 0; i < gLevel.size; i++) {
      for (var j = 0; j < gLevel.size; j++) {
         if (!gBoard[i][j].isShown) {
            if (!gBoard[i][j].isMarked) {
               return

            }
         }
      }
   }
   GameOver()
   document.querySelector('.game').innerText = 'YOU WON!'
}

function revealAllMines() {
   for (var i = 0; i < gLevel.size; i++) {
      for (var j = 0; j < gLevel.size; j++) {
         if (gBoard[i][j].isMine) gBoard[i][j].isShown = true
      }
   }
}

function startTimer() {
   if (firstCLickTimer) {
      timer()
      firstCLickTimer = !firstCLickTimer
   }
}

function expandShown(board, elCell, cellI, cellJ) {
   for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= board.length) continue
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
         if (i === cellI && j === cellJ) continue
         if (j < 0 || j >= board[i].length) continue
         board[i][j].isShown = true
      }
   }
}