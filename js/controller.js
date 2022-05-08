function onKeyDown(e) {
    if(answer == "") return
    var totalPlace = (currentRowNum * len) + currentLetterPlace
    if ("abcdefghijklmnopqrstuvwxyz".includes(e.key)) {
      if (impressible) return;
      if(currentLetterPlace != len)
      {
        var place = document.getElementsByClassName('letter' + totalPlace)[0]
        place.innerText = e.key.toUpperCase()
        currentGuess += e.key
        currentLetterPlace++
      }

    } else if (e.keyCode == 8) { //backspace
      if(currentLetterPlace != 0){
        currentGuess = currentGuess.substr(0,currentGuess.length-1)
        clearBox(totalPlace-1)
        currentLetterPlace -= 1
      }
    } else if (e.keyCode == 13) { //enter
      if (currentLetterPlace == len) {
        if (answer.includes(currentGuess)) {
          var colors = getLetterColors(answer, currentGuess)
          colorRow(colors)
          colorKeyBoard(colors)
          informUser(currentGuess + " is the word!")
        } else if (isWord(currentGuess)) {
          var colors = getLetterColors(answer, currentGuess)
          colorRow(colors)
          colorKeyBoard(colors)
          if((answer.length * 5) == (currentLetterPlace * currentRowNum)){
            informUser("the word was " + answer + "!")
          } else {
            informUser(currentGuess + " is not the word :(")
            currentLetterPlace = 0
            currentRowNum++
            currentGuess = ""
          }
        } else {
          informUser(currentGuess + " is not a word...")
        }
      }
    }
}

function onClick(e){
  var key = e.target.textContent
  var fakeEvent = {}
  fakeEvent['key'] = key.toLowerCase()
  if(key == "BACK") fakeEvent['keyCode'] = 8
  if(key == "ENTER") fakeEvent['keyCode'] = 13
  onKeyDown(fakeEvent)
}

document.addEventListener('keydown', onKeyDown);

var keys = document.getElementsByClassName("key")
var skeys = document.getElementsByClassName("skey")
for(var i = 0; i < keys.length; i++){
  keys[i].addEventListener('mouseup', onClick)
}

for(var i = 0; i < skeys.length; i++){
  skeys[i].addEventListener('mouseup', onClick)
}
