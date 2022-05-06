function onKeyDown(e) {
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
          informUser(currentGuess + " is the word!")
        } else if (isWord(currentGuess)) {
          colorRow(getLetterColors(answer, currentGuess))
          informUser(currentGuess + " is not the word :(")
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
          informUser(currentGuess + " is not a word...")
        }
      }
    }
}

document.addEventListener('keydown', onKeyDown);
