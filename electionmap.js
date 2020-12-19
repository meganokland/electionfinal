
var makePolitician = function(name, partyColor) {
  var politician = {};
  politician.name = name;
  politician.electionResults = null;
  politician.totalVotes = 0;
  politician.tallyTotalVotes = function() {
    this.totalVotes = 0;
    for (var i = 0; i < this.electionResults.length; i++) {
      this.totalVotes = this.totalVotes + this.electionResults[i];
    }
  }
  politician.partyColor = partyColor;
  return politician;
};

// set up the details for each candidate //

var candidate1 = makePolitician("Jane Doe", [132,17,11]);
var candidate2 = makePolitician("Jill Buck", [15,11,132]);

candidate1.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

candidate2.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];


// a few last-minute tally updates //

candidate1.electionResults[9] = 1;
candidate2.electionResults[9] = 28;

candidate1.electionResults[4] = 17;
candidate2.electionResults[4] = 38;

candidate1.electionResults[43] = 11;
candidate2.electionResults[43] = 27;


// calculate and report the results by state //

var setStateResults = function(State) {
  theStates[State].winner = null;
  if (candidate1.electionResults[State] > candidate2.electionResults[State]) {
    theStates[State].winner = candidate1;
    } else if (candidate1.electionResults[State] < candidate2.electionResults[State]) {
      theStates[State].winner = candidate2;
    }
  var stateWinner = theStates[State].winner;
  if (stateWinner !== null) {
    theStates[State].rgbColor = stateWinner.partyColor;
    } else {
      theStates[State].rgbColor = [128,0,128];
    }

  // and report the state results in the lower table //

  var stateResultsTable = document.getElementById('stateResults');
  var header = stateResultsTable.children[0];
  var body = stateResultsTable.children[1];
  var stateName = header.children[0].children[0];
  var stateAbbrev = header.children[0].children[1];
  var candidate1Name = body.children[0].children[0];
  var candidate2Name = body.children[1].children[0];
  var candidate1Results = body.children[0].children[1];
  var candidate2Results = body.children[1].children[1];
  var winnersName = body.children[2].children[1];

  stateName.innerText = theStates[State].nameFull;
  stateAbbrev.innerText = theStates[State].nameAbbrev;
  candidate1Name.innerText = candidate1.name;
  candidate2Name.innerText = candidate2.name;
  candidate1Results.innerText = candidate1.electionResults[State];
  candidate2Results.innerText = candidate2.electionResults[State];

  if (stateWinner !== null) {
  winnersName.innerText = stateWinner.name;
  } else {
    winnersName.innerText = "TIE"
  }

}

// calculate and report the overall results //

candidate1.tallyTotalVotes();
candidate2.tallyTotalVotes();
console.log(candidate1.name + " has " + candidate1.totalVotes + " total votes.");
console.log(candidate2.name + " has " + candidate2.totalVotes + " total votes.");

var winner = function() {
  if (candidate1.totalVotes > candidate2.totalVotes) {
    console.log(candidate1.name + " is the winner.");
    winnerName = candidate1.name;
  } else if (candidate1.totalVotes < candidate2.totalVotes) {
    console.log(candidate2.name + " is the winner.");
    winnerName = candidate2.name;
  } else {
    console.log("It's a draw!")
  }
}
winner();

// report the countrywide results in the top table //

var countryResultsTable = document.getElementById ('countryResults');

countryResultsTable.children[0].children[0].children[0].innerText = candidate1.name;
countryResultsTable.children[0].children[0].children[1].innerText = candidate1.totalVotes;
countryResultsTable.children[0].children[0].children[2].innerText = candidate2.name;
countryResultsTable.children[0].children[0].children[3].innerText = candidate2.totalVotes;
countryResultsTable.children[0].children[0].children[5].innerText = winnerName;
