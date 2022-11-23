const FLAG = '🚩'
const MINE = '💣'
const EMPTY = ' '

var gBoard
var gSize = 4

gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }

function initGame() {
   gBoard = buildBoard()
   renderBoard(gBoard)
}