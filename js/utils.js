function buildBoard() {
    
    const board = []
    for (var i = 0; i < gSize; i++) {
        board.push([])
        for (var j = 0; j < gSize; j++) {
            board[i][j] = { minesAroundCount: null, isShown: false, isMine: false, isMarked: false }
        }
    }
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var cell
    var strHTML = ''
    for (var i = 0; i < gSize; i++) {
        strHTML += `\n<tr>`
        for (var j = 0; j < gSize; j++) {
            // var cellClass = getClassName({ i: i, j: j })
            var negsCount = setMinesNegsCount(i, j, gBoard)
            if (board[i][j].isShown) {
                cell = (board[i][j].isMine) ? `${MINE}` : `${negsCount}`
            } else {
                cell = ` `
            }
            strHTML += `\n<td class="cell" onclick="cellClicked(this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += `\n</tr>`
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function countNegs(board) {
    for (var i = 0; i < gSize; i++) {
        for (var j = 0; j < gSize; j++) {
            var currCell = board[i][j]
            currCell.minesAroundCount = setMinesNegsCount(i, j, board)
        }
    }

}

function setMinesNegsCount(cellI, cellJ, board) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) negsCount++
        }
    }
    return negsCount
}


function cellClicked(elCell, i, j) {
    gBoard[i][j].isShown = true
    renderBoard(gBoard)
}


function getRandomMines(minesAmount) {
    for (var i = 0; i < minesAmount; i++) {
        gBoard[getRandomInt(0, gSize)][getRandomInt(0, gSize)].isMine = true
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}


function startTimer() {
    gStartTime = Date.now()
    gInterval = setInterval(() => {
        const seconds = (Date.now() - gStartTime) / 1000
        var elSpan = document.querySelector('.time span')
        elSpan.innerText = seconds.toFixed(3)
    }, 1)
  }