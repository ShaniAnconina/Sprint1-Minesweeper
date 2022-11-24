function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.size; i++) {
        board.push([])
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = { minesAroundCount: null, isShown: false, isMine: false, isMarked: false }
        }
    }
    console.log('board:', board)
    return board
}


function renderBoard(board) {
    var cell
    var strHTML = ''
    for (var i = 0; i < gLevel.size; i++) {
        strHTML += `\n<tr>`
        for (var j = 0; j < gLevel.size; j++) {
            var negsCount = setMinesNegsCount(i, j, board)
            var className = (board[i][j].isShown) ? `shown` : ``
            // var cellClass = getClassName({ i: i, j: j })
            if (board[i][j].isShown) {
                // cell = (board[i][j].isMine) ? `${MINE}` : `${negsCount}`
                if (board[i][j].isMine) {
                    cell = `${MINE}`
                } else {
                    cell = `${negsCount}`
                    if(!negsCount) cell = ` `
                }
            } else if (board[i][j].isMarked) {
                cell = `${FLAG}`
            } else {
                cell = ` `
            }
            strHTML += `\n<td class="cell ${className}" oncontextmenu="cellMarked(this, ${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += `\n</tr>`
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}


function countNegs(board) {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
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


function getRandomMines(minesAmount) {
    for (var i = 0; i < minesAmount; i++) {
        gBoard[getRandomInt(0, gLevel.size)][getRandomInt(0, gLevel.size)].isMine = true
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}


function startTimer() {
    gStartTime = Date.now()
    gTimeInterval = setInterval(() => {
        const seconds = (Date.now() - gStartTime) / 1000
        var elTime = document.querySelector('.time')
        elTime.innerText = seconds.toFixed(3)
    }, 1)
}