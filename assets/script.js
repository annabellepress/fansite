console.log("mulan is everything");

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7nJrEbX6qplCp0'}).base('appGSfq2jOBVtgdTX');
	
	console.log(Airtable);

	base("characters").select({}).eachPage(gotPageOfCharacters, gotAllCharacters);

// an empty array to hold our data
let mulanCharacters = [];

// callback function that recieves our data
function gotPageOfCharacters(records, fetchNextPage) {
	console.log("gotPageOfCharacters()");
	mulanCharacters.push(...records);
	fetchNextPage();
}

// callback function that is called when all pages are loaded 
function gotAllCharacters(err) {
	console.log("gotAllCharacters()");

		//report an error, you'd want to do soemthing better than this is production
		if (err) {
			console.log("error loading data");
			console.error(err);
			return;
		}

		// call functions to log and show the books
		consoleLogCharacters();
		showCharacters();
}

// just loop through the data and console.log them
function consoleLogCharacters() {
	console.log("consoleLogCharacters()");
	//this is your empty array from earlier
	mulanCharacters.forEach((character) => {
		console.log("Character:", character);
	});
}

// look through our airtable data, create elements 
function showCharacters() {
	console.log("showCharacters()");
	// console.log(mulanCharacters.length);
	mulanCharacters.forEach((character) => {
		let container = document.createElement("div")

		// display the character name
		var characterName = document.createElement("h2")
		characterName.classList.add("charactername")
		characterName.innerText = character.fields.name
		container.append(characterName)

		// display the character description
		var characterBio = document.createElement("p")
		characterBio.classList.add("characterbio")
		characterBio.innerText = character.fields.description
		container.append(characterBio)
		//display the character image
		var characterImg = document.createElement("img")
		characterImg.classList.add("characterimg")
		characterImg.src = character.fields.images[0].url;
		container.append(characterImg)
		
       	container.classList.add("character")
        document.querySelector(".container").append(container)
	});
}

