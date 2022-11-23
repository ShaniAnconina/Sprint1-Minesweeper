const FLAG = '🚩'
const MINE = '💣'
const EMPTY = ' '

var gBoard
var gStartTime
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gLevel = { size: 4, mines: 2 }
var gSize = gLevel.size
// var gSize = 4


function initGame() {
   gBoard = buildBoard()
   getRandomMines(gLevel.mines)
   countNegs(gBoard)
   renderBoard(gBoard)
}

