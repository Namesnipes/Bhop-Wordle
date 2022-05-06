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
          var colors = getLetterColors(answer, currentGuess)
          colorRow(colors)
          colorKeyBoard(colors)
          informUser(currentGuess + " is the word!")
        } else if (isWord(currentGuess)) {
          var colors = getLetterColors(answer, currentGuess)
          colorRow(colors)
          colorKeyBoard(colors)
          informUser(currentGuess + " is not the word :(")
          currentLetterPlace = 0
          currentRowNum++
          currentGuess = ""
        } else {
          informUser(currentGuess + " is not a word...")
        }
      }
    }
}

document.addEventListener('keydown', onKeyDown);
