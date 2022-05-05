keys = {
        37: ['ArrowLeft', 'left', false],
        39: ['ArrowRight', 'right', false],
        40: ['ArrowDown', 'down', false],
        90: ['z', 'rotateCW', false],
        88: ['x', 'rotateCCW', false],
        32: ['spacebar', 'hardDrop', false]
    };

var isTetris = false

function onKeyDown(e) {
  if(currentShape == null ) isTetris = false
  if(!isTetris){
    var totalPlace = (currentRowNum * 5) + currentLetterPlace
    if ("abcdefghijklmnopqrstuvwxyz".includes(e.key)) {
      if (impressible) return;
      if(currentLetterPlace != 5)
      {
        var place = document.getElementsByClassName('letter' + totalPlace)[0]
        place.innerText = e.key
        currentGuess += e.key
        currentLetterPlace++
      }

    } else if (e.keyCode == 8) {
      if(currentLetterPlace != 0){
        currentGuess = currentGuess.substr(0,currentGuess.length-1)
        clearBox(totalPlace-1)
        currentLetterPlace -= 1
      }
    } else if (e.keyCode == 13) {
      if (currentLetterPlace == 5) {
        if (answer.includes(currentGuess)) {
          colorRow(getLetterColors(answer, currentGuess))
          console.log(currentGuess + " is the word")
        } else if (isWord(currentGuess)) {
          colorRow(getLetterColors(answer, currentGuess))
          console.log(currentGuess + " is NOT the word")
          currentLetterPlace = 0
          currentRowNum++
          var piece = getLetterColors(answer, currentGuess)
          var creationBlock = []
          for(var i = 0; i < piece.length; i++){
            if(piece[i] == "white") {creationBlock[i] = 0}
            else {creationBlock[i] = 1}
          }
          currentShape = creationBlock
          currentGuess = ""
          isTetris = true
        } else {
          console.log(currentGuess + " is NOT a word")
        }
      }
    }
  } else {
    if (document.activeElement.tagName != "INPUT" && typeof keys[e.keyCode] != 'undefined') {
      var isDown = keys[e.keyCode][2]
      if(isDown) return
      keys[e.keyCode][2] = true
      keyPress(keys[e.keyCode][1],false);
  }
  }
}

function onKeyUp(e){
  if(isTetris){
    if (document.activeElement.tagName != "INPUT" && typeof keys[e.keyCode] != 'undefined') {
        var isDown = keys[e.keyCode][2]
        keys[e.keyCode][2] = false
        keyPress(keys[e.keyCode][1],true);
    }
  }
}



document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
