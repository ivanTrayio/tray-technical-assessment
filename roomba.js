var fs = require("fs");

function processInstructions(cardinalDirection) {
  switch (cardinalDirection) {
    case 'N':
      currentCoordinates[1] = parseInt(currentCoordinates[1]) + 1;
      break;
    case 'E':
      currentCoordinates[0] = parseInt(currentCoordinates[0]) + 1;
      break;
    case 'S':
      currentCoordinates[1] = parseInt(currentCoordinates[1]) - 1;
      break;
    case 'W':
      currentCoordinates[0] = parseInt(currentCoordinates[0]) - 1;
      break;
    default:
      break;
  }
}

function checkForDirt() {
  if (dirtPatches.indexOf(currentCoordinates.join(' ')) > -1) {
    console.log(`Patch cleaned at position (${currentCoordinates})`);
    cleanedPatchCount += 1;

    // Remove patch of dirt that has already been accounted for
    dirtPatches.splice(dirtPatches.indexOf(currentCoordinates.join(' '), 1));
  }
}

function isTouchingWall() {
  return (currentCoordinates[0] == 0 && cardinalDirections[i] == 'W' ||
    currentCoordinates[0] == roomDimensions[0] && cardinalDirections[i] == 'E') ||
    (currentCoordinates[1] == 0 && cardinalDirections[i] == 'S' ||
      currentCoordinates[1] == roomDimensions[1] && cardinalDirections[i] == 'N');
}

var cleanedPatchCount = 0;

// Convert text file to array of strings
var text = fs.readFileSync("input.txt").toString('utf-8');
var fileContent = text.split("\n");

// Known index of room dimenstions 
var roomDimensions = fileContent[0].split(' ');

// Known index of starting point
var currentCoordinates = fileContent[1].split(' ');

// Known index of cardinal directions 
var max_index = fileContent.length - 1;
var cardinalDirections = fileContent[max_index].split("");

// Remove known items 
fileContent.splice(max_index, 1);
fileContent.splice(0, 2);

// Remaining items in string array are the n number of dirt patches
dirtPatches = fileContent;

// Loop through cardinal directions 
for (var i = 0, len = cardinalDirections.length; i < len; i++) {
  if (isTouchingWall() == false) {
    processInstructions(cardinalDirections[i]);
    checkForDirt();
  } else {
    console.log(`Hit wall at position (${currentCoordinates}) and cardinal direction (${cardinalDirections[i]})`);
  }
}

console.log(`Final Position (${currentCoordinates})`);
console.log(`Number of cleaned patches (${cleanedPatchCount})`);

