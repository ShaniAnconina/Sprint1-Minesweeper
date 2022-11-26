'use strict'

function buildBoard() {
    const gBoard = []
    for (var i = 0; i < gLevel.size; i++) {
        gBoard.push([])
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j] = { minesAroundCount: null, isShown: false, isMine: false, isMarked: false }
        }
    }
    console.log('gBoard:', gBoard)
    return gBoard
}


function renderBoard() {
    var cell
    var strHTML = ''
    for (var i = 0; i < gLevel.size; i++) {
        strHTML += `\n<tr>`
        for (var j = 0; j < gLevel.size; j++) {
            const negsCount = setMinesNegsCount(i, j, gBoard)
            var className = (gBoard[i][j].isShown) ? `shown` : ``
            // var cellClass = getClassName({ i: i, j: j })
            if (gBoard[i][j].isShown) {
                if (gBoard[i][j].isMine) {
                    cell = `${MINE}`
                } else {
                    cell = `${negsCount}`
                    if (!negsCount) cell = ` `
                }
            } else if (gBoard[i][j].isMarked) {
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


function countNegs() {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            var currCell = gBoard[i][j]
            currCell.minesAroundCount = setMinesNegsCount(i, j)
        }
    }
}


function setMinesNegsCount(cellI, cellJ) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isMine) negsCount++
        }
    }
    return negsCount
}


function getRandomMines(minesAmount, currI, currJ) {
    for (var i = 0; i < minesAmount; i++) {
        var cellI = getRandomInt(0, gLevel.size)
        var cellJ = getRandomInt(0, gLevel.size)
        while (currI === cellI && currJ === cellJ) {
            // if( currI === cellI && currJ === cellJ ){
            cellI = getRandomInt(0, gLevel.size)
            cellJ = getRandomInt(0, gLevel.size)
        }
        while (gBoard[cellI][cellJ].isMine) {
            cellI = getRandomInt(0, gLevel.size)
            cellJ = getRandomInt(0, gLevel.size)
        }
        gBoard[cellI][cellJ].isMine = true
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}


function timer() {
    gStartTime = Date.now()
    gTimeInterval = setInterval(() => {
        const seconds = (Date.now() - gStartTime) / 1000
        var elTime = document.querySelector('.time')
        elTime.innerText = seconds.toFixed(3)
    }, 1)
}