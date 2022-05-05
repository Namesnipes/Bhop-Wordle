const COLS = 10
const ROWS = 20

var c = document.getElementById("tetris");
var w = c.width
var h = c.height
var ctx = c.getContext("2d");

var currentShape = null
var xPos = 3; // coords from top left
var yPos = 0;
var froze = false;
var isSoftDropping = false

var currentGravity = 700 //gravity of current level
var colors = ["#a8ebff", "#6666ed", "#f7a540", "#ffdf75", "#a1d186", "#fa5252", "#ce79ed", "#23204a"]

var RenderInterval;
var GravityInterval;

function moveDown(keyUp, isUserInput = false, cellsDown = 1) {
    if(cellsDown <= 0) return

    if(isUserInput && isSoftDropping && keyUp){
      isSoftDropping = false
      setGravity(1000)
    }

    if(isUserInput && !keyUp && !isSoftDropping){
        isSoftDropping = true
        setGravity(75)
    }

    if (!froze && currentShape && !keyUp) {
      console.log(validMove(0, 1))
        if (validMove(0, 1)) {
            yPos += 1
            moveDown(false,false,cellsDown-1)
        } else {
            froze = true
        }
    }
}

function moveLeft() {
    if (!froze && currentShape) {
        if (validMove(-1, 0)) {
            xPos -= 1
        }
    }
}

function moveRight() {
    if (!froze && currentShape) {
        if (validMove(1, 0)) {
            xPos += 1
        }
    }
}

function keyPress(key,isUp) {
  console.log(key,isUp)
  if(isUp && key != 'down') return
    switch (key) {
        case 'left':
            moveLeft()
            break
        case 'right':
            moveRight()
            break
        case 'down':
            moveDown(isUp,true)
            break;
        case 'rotateCW':
            rotate('CW')
            break;
        case 'rotateCCW':
            rotate('CCW')
            break;
        case 'hardDrop':
        	hardDrop()
        	break;
    }
}


function validMove(xOffset, yOffset, testBlock) {
    var block = currentShape
    var length = block[0].length
    for(var i = 0; i < currentShape.length; i++){
      if(block[i] === 0) continue;
      var y = Math.floor(i / 5)
      var x = i % 5
      var blockY = y + yPos + yOffset
      var blockX = x + xPos + xOffset
      if (blockY > (ROWS-1)) return false; //under map
      if (blockX < 0 || blockX > (COLS - 1)) return false; // to right or left of map
      if (blockY > -1 && board[blockY][blockX] != 0) return false; // above map
    }
    return true
}

function paintPieceToBoard() {
    var block = currentShape
    end = false
    var size = block.length
    for(var i = 0; i < block.length; i++){
      var y = Math.floor(i / 5)
      var x = i % 5
      var blockY = y + yPos
      var blockX = x + xPos
      if(block[i] != 0){
        board[blockY][blockX] = block[i]
        if (yPos < 0) end = true;
      }
    }
    xPos = 3;
    yPos = 0;
    printBoard()
}

function printBoard() {
    var space = false
    for (var y = 0; y < ROWS; y++) {
        var row = ""
        for (var x = 0; x < COLS; x++) {
            var piece = false;
            if (typeof currentShape[y - yPos] != 'undefined') {
                var piece = currentShape[y - yPos][x - xPos]
            }
            if (piece) {
                row += " " + piece
            } else {
                row += " " + (board[y][x])
            }
        }
        console.log(row)
        space = !space
    }
}

function renderBoard() {
    if (currentShape){
      for(var i = 0; i < currentShape.length; i++){
        var y = Math.floor(i / 5)
        var x = i % 5
        if(currentShape[i] == 1){
          drawSquare(x + xPos,y + yPos,3,false)
        }
      }
    }

    for (var y = 0; y < ROWS; y++) {
        for (var x = 0; x < COLS; x++) {
            if(board[y][x]){
              drawSquare(x,y,3,false)
            }
        }
    }
}

function drawSquare(x, y, id, isQueue, gridTransparency = 1, isGrid = false) { // coords from upper left corner
    var thisCols = COLS
    var thisRows = ROWS
    var thisCtx = ctx
    var BlockPixelWidth = w / thisCols
    var BlockPixelHeight = h / thisRows

    thisCtx.fillStyle = colors[id - 1]
    thisCtx.fillRect(x * BlockPixelWidth, y * BlockPixelHeight, BlockPixelWidth, BlockPixelHeight)


    function gridCell(){
      thisCtx.lineWidth = 1;
      thisCtx.strokeStyle = 'rgba(242, 237, 228,' + gridTransparency + ')';
      thisCtx.strokeRect(x * BlockPixelWidth+thisCtx.lineWidth/2, y * BlockPixelHeight+thisCtx.lineWidth/2, BlockPixelWidth-thisCtx.lineWidth, BlockPixelHeight-thisCtx.lineWidth);
    }

    function tetrisCell(){
      thisCtx.lineWidth = 4;
      if(id==1){
        thisCtx.strokeStyle = 'rgba(112, 200, 219,' + gridTransparency + ')';
      }
      //blue
      else if(id==2){
        thisCtx.strokeStyle = 'rgba(65, 65, 158,' + gridTransparency + ')';
      }
      //orange
      else if(id==3){
        thisCtx.strokeStyle = 'rgba(219, 131, 24,' + gridTransparency + ')';
      }
      //yellow
      else if(id==4){
        thisCtx.strokeStyle = 'rgba(245, 192, 78,' + gridTransparency + ')';
      }
      //green
      else if(id==5){
        thisCtx.strokeStyle = 'rgba(97, 150, 68,' + gridTransparency + ')';
      }
      //red
      else if(id==6){
        thisCtx.strokeStyle = 'rgba(191, 46, 46,' + gridTransparency + ')';
      }
      //purple
      else if(id==7){
        thisCtx.strokeStyle = 'rgba(146, 77, 171,' + gridTransparency + ')';
      }
      thisCtx.strokeRect(x * BlockPixelWidth+thisCtx.lineWidth/2, y * BlockPixelHeight+thisCtx.lineWidth/2, BlockPixelWidth-thisCtx.lineWidth, BlockPixelHeight-thisCtx.lineWidth);
    }

    if(isGrid){
      gridCell()
    } else {
      tetrisCell()
    }
}

function drawGrid() {
  var thisCols = COLS
  var thisRows = ROWS
  var thisTransparency = 0.1
    for (var y = 0; y < thisRows; y++) {
        for (var x = 0; x < thisCols; x++) {
            drawSquare(x, y, 8, false, thisTransparency,true)
        }
    }
}

function init() {
    for (var y = 0; y < ROWS; y++) {
        board[y] = [];
        for (var x = 0; x < COLS; x++) {
            board[y][x] = 0
        }
    }
}

function renderStepped() {
    ctx.clearRect(0, 0, w, h);
    drawGrid()
    if (froze) {
        if(!isSoftDropping){
          setGravity(currentGravity)
        }
        paintPieceToBoard()
        currentShape = null
        froze = false
        //clearLines()
        //if (!end) newTetromino();
    }
    if (end) {
        clearInterval(RenderInterval)
        clearInterval(GravityInterval)
        newGame()
    }
  renderBoard()
}



function gravity(cellsPerFrame) { // increase function call rate to increase gravity
    if (currentShape) {
       moveDown(false,false,cellsPerFrame)
    }
}

function setGravity(msPerFall){
  var cellsPerFrame = 1
  if(msPerFall < (1000/60)){
    cellsPerFrame = (1000/60) / msPerFall
    msPerfall = (1000/60)
  }
  clearInterval(GravityInterval)
  GravityInterval = setInterval(gravity, msPerFall, Math.round(cellsPerFrame))
}

function newGame() {
    end = false;
    init()
    RenderInterval = setInterval(renderStepped, 1000 / 60)
    setGravity(currentGravity)
}

newGame()
