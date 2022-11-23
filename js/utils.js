function buildBoard() {
    const board = []
    for (var i = 0; i < gSize; i++) {
        board.push([])
        for (var j = 0; j < gSize; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: true }
        }
    }
    board[0][0].isMine = board[2][2].isMine = true
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < gSize; i++) {
        strHTML += `\n<tr>`
        for (var j = 0; j < gSize; j++) {
            var negsCount = setMinesNegsCount(i, j, gBoard)
            var cell = (board[i][j].isMine) ? `${MINE}` : `${negsCount}`
            // var cellClass = getClassName({ i: i, j: j })
            strHTML += `\n<td class="cell" onclick="cellClicked(this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += `\n</tr>`
    }
    console.log('strHTML:', strHTML)
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML += strHTML
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
    elCell.isShown = true
    console.log('elCell.isShown:', elCell.isShown)
}