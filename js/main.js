
// variables
var computer = document.querySelector('#computer');
var human = document.getElementById('human');
var button = document.getElementsByTagName('button')[0];
var logo = document.getElementById("logo");
var catImage = document.getElementById("cat");
var cpuImage = document.getElementById("cpu");
var responseNumber;
var newResponse;
var humanMsg = "";
var computerMsg = "";
var searchQuery = "";

var questionTrack = "start";
var lovesCats = false;
var likesCats = false;

var genericResponses = [
  "...",
  "Loading cats...",
  "I can't hear you over all this meowing...",
  "Meow!"
];

var losingResponses = [
  "Let me guess, you voted for Trump?",
  "I hate you.",
  "You are a liar."
]

// focus search
human.focus();

// button and enter key submit
button.addEventListener("click", clickHandler, false);
function clickHandler() {
  playGame();
}
window.addEventListener("keydown", keydownHandler, false);
function keydownHandler(event) {
  if (event.keyCode === 13) {
    playGame();
  }
}

// game states
function playGame() {
  humanMsg = (human.value).toLowerCase();

  switch (questionTrack) {
    case "start":
      firstAnalysis();
      break;
    case "primary":
      primaryAnalysis();
      break;
    case "secondary":
      secondaryAnalysis();
      break;
    case "cat":
      catAnalysis();
      break;
    case "yesCat":
      yesCatAnalysis();
      break;
    case "noCat":
      noCatAnalysis();
      break;
    case "endCat":
      endCatAnalysis();
      break;
    case "losing":
      finalAnalysis();
      break;
    case "alternate":
      alternateEnding();
      break;
    case "search":
      webSearch();
      break;
    default:
      genericResponse();
      break;
  }
  computer.innerHTML = computerMsg;
  human.value = "";
}

// default responses
function genericResponse() {
  if (genericResponses.length > 0) {
    newResponse = Math.floor(Math.random() * genericResponses.length);
    responseNumber = newResponse;
    computerMsg = genericResponses[responseNumber];
    genericResponses.splice(responseNumber, 1);
  } else {
    computerMsg = "I FOUND THE CATS!";
    winGame();
  }
}

function losingResponse() {
  if (losingResponses.length > 0) {
    newResponse = Math.floor(Math.random() * losingResponses.length);
    responseNumber = newResponse;
    computerMsg = losingResponses[responseNumber];
    losingResponses.splice(responseNumber, 1);
  } else {
    computerMsg = "Leave me alone.";
    human.className = "displayNone";
    button.className = "displayNone";
  }
}

// initial response
function firstAnalysis() {
  searchQuery = humanMsg;
  if (humanMsg.indexOf("cat")!=-1) {
    computerMsg = "You like cats, eh?";
    questionTrack = "cat";
  } else if (Math.random() > 0.1) {
    computerMsg = "HEY! What do you think I am, a search engine?";
    questionTrack = "primary";
  } else {
    computerMsg = "HEY! What do you think I am, a search engine?";
    questionTrack = "secondary";
  }
}

// primary 90% track
function primaryAnalysis() {
  if (humanMsg.indexOf("yes") !== -1) {
    computerMsg = "Well, I don't know what you are searching for, but I'm going to assume it's cats. 95% of all searches are for cats.";
    questionTrack = "catSearch";
  } else if (humanMsg.indexOf("no") !== -1) {
    computerMsg = "You are wrong. I am the best search engine. Searching for \"Cats\".";
    questionTrack = "catSearch";
  } else {
    computerMsg = "Do you like cats?";
    questionTrack = "ending";
  }
}

// secondary 10% track
function secondaryAnalysis() {
  if (humanMsg.indexOf("yes") !== -1) {
    computerMsg = "If 95% of searches are for cats, then the remaining 5% must be for porn. You are the 5%.";
    questionTrack = "alternate";
  } else if (humanMsg.indexOf("no") !== -1) {
    computerMsg = "Did you vote for Trump?";
    questionTrack = "losing";
  } else {
    computerMsg = "What do you think about all day? Cats?";
    questionTrack = "ending";
  }
}

// cat search track
function catAnalysis() {
  if (humanMsg.indexOf("yes") !== -1) {
    logo.className = "displayNone";
    catImage.className = "";
    computerMsg = "LOOK AT THIS CAT!";
    lovesCats = true;
    questionTrack = "yesCat";
  } else if (humanMsg.indexOf("no") !== -1) {
    computerMsg = "Not even a little bit?";
    loves = false;
    questionTrack = "noCat";
  } else {
    genericResponse();
  }
}
function yesCatAnalysis() {
  if (humanMsg !== "") {
    humanMsg = "";
    computerMsg = "DO YOU STILL LIKE CATS?";
    questionTrack = "endCat";
  }
}
function noCatAnalysis() {
  if (humanMsg.indexOf("yes") !== -1 || humanMsg.indexOf("maybe") !== -1) {
    humanMsg = "";
    computerMsg = "That's right. Cat's are good.";
    likesCats = true;
    questionTrack = "endCat";
  } else {
    humanMsg = "";
    computerMsg = "How could you not like cats?";
    questionTrack = "endCat";
  }
}
function endCatAnalysis() {
  if (lovesCats) {
    if (humanMsg.indexOf("yes") !== -1) {
      computerMsg = "That is some dedication!";
      winGame();
    } else if (humanMsg.indexOf("no") !== -1) {
      computerMsg = "I hate you.";
      endGame();
    }
  } else if (likesCats) {
      computerMsg = "Let me help you find cats.";
      winGame();
  } else {
    computerMsg = "I don't like you. Go away."
    endGame();
  }
}

function alternateEnding() {
  if (humanMsg.indexOf("no") !== -1) {
    computerMsg = "Oh sorry, that's inappropriate. Maybe we should search for cats."
    questionTrack = "ending";
  } else {
    logo.className = "displayNone";
    cpuImage.className = "";
    human.className = "displayNone";
    button.className = "displayNone";
    computerMsg = "WHOA, PUT SOME CLOTHES ON!"
  }
}

function finalAnalysis() {
  if (humanMsg.indexOf("yes") !== -1) {
    computerMsg = "Go away, idiot.";
    human.className = "displayNone";
    button.className = "displayNone";
    location.assign("https://www.google.com/#q=am+I+an+idiot+for+voting+for+trump");
  } else if (humanMsg.indexOf("no") !== -1) {
    computerMsg = "Whew. At least there is one good thing about you.";
    questionTrack = "search";
  } else {
    losingResponse();
  }
}

function webSearch() {
  computerMsg = "Let me find that thing for you.";
  human.className = "displayNone";
  button.className = "displayNone";
  setTimeout(endGame, 2000);
  location.assign("https://www.google.com/search?q=" + searchQuery);
}

function endGame() {
  ////.assign() leaves the back button working
  ////.replace() disables the back button by replacing the location in the history
  human.className = "displayNone";
  button.className = "displayNone";
  setTimeout(endGame, 2000);
  location.assign("https://google.com");
}

function winGame() {
  human.className = "displayNone";
  button.className = "displayNone";
  setTimeout(endGame, 2000);
  location.assign("https://www.google.com/search?q=cats");
}
