

var impressible = false
var resetNext = false

var currentLetterPlace = 0 // 0-4
var currentRowNum = 0
var currentGuess = ""

var words = []
var debug = "larry"
var answer = ""
fetch('js/words.txt')
  .then(response => response.text())
  .then(text => {
    words = text.split("\n")
    answer = debug || words[Math.floor(Math.random()*words.length)]
  })

function informUser(str){
  document.getElementById("word").innerText = str
}

function clearBox(num) {
  var place = document.getElementsByClassName('letter' + (num))[0]
  place.innerText = ""
}

function clearRow(num) { //row num 0-n
  var start = (num * 5)
  for (var i = start; i < start + 5; i++) {
    var place = document.getElementsByClassName('letter' + i)[0]
    place.innerText = ""
  }
}

function colorRow(colors) {
  for (var i = 0; i < 5; i++) {
    document.getElementsByClassName('letter' + ((currentRowNum * 5) + i))[0].style["background-color"] = colors[i]
  }
}

function isWord(word){
  for(var i = 0; i < words.length; i++){
    if(word == words[i]){
      return true;
    }
  }
  return false
}

function getLetterColors(answer, word) {
  var colors = []

  for (var i = 0; i < 5; i++) {
    var letter = word[i]
    if (answer[i] == letter) {
      colors[i] = "green"
      answer = answer.slice(0, i) + "-" + answer.slice(i + 1)
    }
  }

  for (var i = 0; i < 5; i++) {
    var letter = word[i]
    if ((answer[i] != letter) && answer.includes(letter)) {
      var whereIsIt = answer.indexOf(letter)
      colors[i] = "yellow"
      answer = answer.slice(0, whereIsIt) + "-" + answer.slice(whereIsIt + 1)
    }
  }

  for (var i = 0; i < 5; i++) {
    if (colors[i] == null) {
      colors[i] = "white"
    }
  }
  return colors
}
