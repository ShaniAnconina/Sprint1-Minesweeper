const FLAG = '🚩'
const MINE = '💣'
const EMPTY = ' '

var gBoard
var gStartTime
var gTimeInterval
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gLevel = { size: 4, mines: 2 }
var gClicksCount
var firstCLickTimer = true
var firstCLickMines = true

function initGame() {
   gGame.isOn = true
   document.querySelector('.time').innerText = '00:00'
   gBoard = buildBoard()
   renderBoard(gBoard)
}

function cellClicked(elCell, i, j) {
   startTimer()
   if (firstCLickMines) {
      getRandomMines(gLevel.mines, i, j)
      countNegs(gBoard)
      firstCLickMines = !firstCLickMines
   } else {
      checkGameOver(i, j)
   }
   if (gGame.isOn === false) return
   if (gBoard[i][j].isMarked) return
   gBoard[i][j].isShown = true
   renderBoard(gBoard)
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
   } else {
      isVictory()
   }

}

function GameOver() {
   gGame.isOn = false
   clearInterval(gTimeInterval)
   revealAllMines()
   document.querySelector('.time').style.color = 'red'
   document.querySelector('.game-over').display = 'inline-block'

}

function isVictory() {
   for (var i = 0; i < gLevel.size; i++) {
      for (var j = 0; j < gLevel.size; j++) {
         if (!gBoard[i][j].isShown) {
            if (!gBoard[i][j].isMarked) {
               console.log('here');
               return

            }

         }
         GameOver()
         document.querySelector('.game-over').innerText = 'YOU WON!'
      }
   }
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

// function revealNotMineNegs() {
//    for (var i = 0; i < gLevel.size; i++) {
//       for (var j = 0; j < gLevel.size; j++) {
//          var negs = setMinesNegsCount(j, j, gBoard)
//          console.log('negs:', negs , i,j)
//          // if (!gBoard[i][j].minesAroundCount) negs
//       }
//    }
// }