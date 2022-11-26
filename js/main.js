'use strict'

const FLAG = '🚩'
const MINE = '💣'
const EMPTY = ' '

const audioClick = new Audio('../sound/click.wav')
const audioWin = new Audio('../sound/win.wav')
const audioLose = new Audio('../sound/gameover.wav')

var gBoard
var gStartTime
var gTimeInterval
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gLevel = { size: 4, mines: 2 }
var gClicksCount
var gFirstCLickTimer
var gFirstCLickMines
var gLivesCounter


function initGame() {
   gGame.isOn = true
   gFirstCLickTimer = true
   gFirstCLickMines = true
   gLivesCounter = 3
   restartVisibility()
   gBoard = buildBoard()
   renderBoard()
}

function cellClicked(elCell, i, j) {
   startTimer()
   if (gFirstCLickMines) {
      getRandomMines(gLevel.mines, i, j)
      countNegs(gBoard)
      gFirstCLickMines = !gFirstCLickMines
   }
   if (gGame.isOn === false) return
   if (gBoard[i][j].isShown) return
   if (gBoard[i][j].isMarked) return
   if (!gBoard[i][j].minesAroundCount && !gBoard[i][j].isMine) expandShown(i, j)
   if (!gFirstCLickMines) checkGameOver(i, j)
   if (!gBoard[i][j].isMine) audioClick.play()
   else audioLose.play()
   gBoard[i][j].isShown = true
   renderBoard(gBoard)
}

function cellMarked(elCell, i, j) {
   if (gGame.isOn === false) return
   if (gBoard[i][j].isShown) return
   startTimer()
   audioClick.play()
   if (!gBoard[i][j].isMarked) {
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

function revealAllMines() {
   for (var i = 0; i < gLevel.size; i++) {
      for (var j = 0; j < gLevel.size; j++) {
         if (gBoard[i][j].isMine) gBoard[i][j].isShown = true
      }
   }
}

function startTimer() {
   if (gFirstCLickTimer) {
      timer()
      gFirstCLickTimer = !gFirstCLickTimer
   }
}

function expandShown(cellI, cellJ) {
   for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
         if (i === cellI && j === cellJ) continue
         if (j < 0 || j >= gBoard[i].length) continue
         if (gBoard[i][j].isShown) continue
         if (gBoard[i][j].isMine) continue
         if (gBoard[i][j].minesAroundCount) gBoard[i][j].isShown = true
         if (!gBoard[i][j].minesAroundCount) {
            gBoard[i][j].isShown = true
            expandShown(i, j)
         }
      }
   }
}

function checkGameOver(i, j) {
   if (gBoard[i][j].isMine) {
      if (gLivesCounter === 1) {
         GameOver()
         document.querySelector('.restart').innerText = '😭'
      } else if ((gLivesCounter === 3)) {
         document.querySelector('.lives').innerText = '🤍🤍'
      } else if ((gLivesCounter === 2)) {
         document.querySelector('.lives').innerText = '🤍'
      }
      gLivesCounter--
   } else if (!gBoard[i][j].isMine && gLivesCounter === 1) {
      isVictory()
   }

}

function GameOver() {
   gGame.isOn = false
   clearInterval(gTimeInterval)
   revealAllMines()
   document.querySelector('.time').style.color = 'red'
   document.querySelector('.game').style.opacity = '1'
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
   audioWin.play()
   document.querySelector('.restart').innerText = '😎'
   document.querySelector('.game').innerText = 'YOU WON!'
}

function restartVisibility() {
   document.querySelector('.game').style.opacity = '0'
   document.querySelector('.time').innerText = '00:00'
   document.querySelector('.time').style.color = 'black'
   document.querySelector('.restart').innerText = '😊'
   document.querySelector('.lives').innerText = '🤍🤍🤍'
}