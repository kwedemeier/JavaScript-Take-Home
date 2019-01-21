// Jokes js

var jokeId = 11; // Current joke id being displayed
var jokeType = ""; // For filtering by Type dropdown
var jokeFltr = ""; // For filtering by String

// Initial get for page load
function main(){
	var currJoke = getJoke();
	setJoke(currJoke);
}

// Initial get first joke functionality
function getJoke() {
	var jokeFlag = 0;
	var currJoke = allJokes[11];
	for(var i = 0; i < allJokes.length + 1; i++) {
		if(allJokes[i].id == jokeId && jokeFlag != 1) {
			jokeFlag = 1;
			currJoke = allJokes[i];
			i = allJokes.length;
		}
	}
	if(!jokeFlag)
		getJoke();
	else
		return currJoke;
}

// This sets the display for the current joke
// I used both javaScript and jQuery to show knowledge of both
// I normally would use one for consistency
function setJoke(currJoke) {
	document.getElementById("joke").innerHTML=currJoke.setup;
	document.getElementById("answer").innerHTML=currJoke.punchline;
	
	if(currJoke.type == "general") {
		var setup = currJoke.setup.split(' ');
		var word = setup[0];
		if(word == "Why")
			$("#ansPlease").val(word + "?");
		else if(word == "How")
			$("#ansPlease").val(word + "?");
		else if(word.includes("What") || word == "Finally")
			$("#ansPlease").val("What?");
		else if(word == "If")
			$("#ansPlease").val("Then..?");
		else if(word == "Want")
			$("#ansPlease").val("Sure");
		else 
			$("#ansPlease").val("...");
	} else 
		$("#ansPlease").val("...");
}

// Call for onClick event of "Next Please" button
function nextId() {
	currJoke = getNext();
	$("#answer").css('visibility','hidden');
	setJoke(currJoke);
	
	return 1;
}

// Functional loop to find the next valid joke based on filtering
function getNext() {
	var jokeFlag = 0;
	var currJoke = allJokes[0];
	if(jokeId == 55) jokeId = 10;
	for(var j = jokeId; j < 56; j++) {
		jokeId++;
		for(var i = 0; i < allJokes.length; i++) {
			if(allJokes[i].id == jokeId && jokeFlag != 1) {
				if((jokeType == "" || allJokes[i].type == jokeType) && (jokeFltr == "" || allJokes[i].setup.includes(jokeFltr))) {
					jokeFlag = 1;
					currJoke = allJokes[i];
					i = allJokes.length;
					j = 55;
				}
			}
		}
		if(i == allJokes.length && j == 55 && jokeFlag == 0) {
			jokeId = 10;
			j = 10;
		}
	}
	return currJoke;
}

// Initial setting of jokeType onChange or jokeFlter on "Try This" button click
function sort() {
	jokeType = $("#type option:selected").val().toLowerCase();
	jokeFltr = $("#filter").val();
	if(jokeId != 11) jokeId = 10;
	
	nextId();
	
	return 1;
}

// Shows the answer to user on button click
function showAns() {
	$("#answer").css('visibility','visible');
}
