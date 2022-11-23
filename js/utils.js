function buildBoard() {
    const board = []
    for (var i = 0; i < gSize; i++) {
        board.push([])
        for (var j = 0; j < gSize; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: true, isMine: false, isMarked: true }
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
            var cell = (board[i][j].isMine) ? `${MINE}` : ` ${EMPTY}`
            // var cellClass = getClassName({ i: i, j: j })
            // countMinesAround = setMinesNegsCount(gBoard)
            strHTML += `\n<td class="cell" onclick="cellClicked(this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += `\n</tr>`
    }
    
    setMinesNegsCount()
    console.log('strHTML:', strHTML)
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML += strHTML
}


function setMinesNegsCount(){
    for (var i = 0; i < gSize; i++) {
        for (var j = 0; j < gSize; j++) {
            gBoard[i][j].minesAroundCount = countNegs(i, j, gBoard)
            console.log('gBoard[i][j].minesAroundCount:', gBoard[i][j].minesAroundCount)
        }
    }
}

function countNegs(cellI, cellJ, board) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) negsCount++ // if (mat[i][j]) negsCount++
        }
    }
    return negsCount
}


// function cellClicked(elCell, i, j) {
//     console.log('cel clicked')

// }