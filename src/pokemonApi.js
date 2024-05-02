
async function getPokemonData(){
    let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/"

    let randomPokemomNumber = Math.floor(Math.random() * 1025) + 1;

    let fullApiUrl = pokemonApiUrlBase + randomPokemomNumber;

    let response = await fetch(fullApiUrl);
    let responseData = await response.json();
    let result = responseData;

    // let promiseRepsonce = await fetch(fullApiUrl).then(elephant => {
    //     return elephant.json();
    // });
    // result = promiseRepsonce;

    return result;
}

async function putDataOnPage(dataToDisplay){
    document.getElementsByClassName("pokemonName")[0].textContent = dataToDisplay.name;
    
    let type1Display = document.getElementsByClassName("pokemonType1")[0];
    let type2Display = document.getElementsByClassName("pokemonType2")[0];

     type1Display.textContent = "Type 1: " + dataToDisplay.types[0].type.name;
    //  type1Display.textContent = data.types[0]["type"]["name"];

    if (dataToDisplay.types[1]){
        // if the data includes a 2nd type, set that as well
        type2Display.textContent = "Type 2: " + dataToDisplay.types[1].type.name;
    } else {
        // if no 2nd type exsits, reset the content in type2Display
        type2Display.textContent = "Type 2: ";
    }

    //Wishlist: add random change to select front_shiny instead of front default

    // Real odds are 1 in 8192
    // Testing/development odds are 1 in 4
    // Generate random number between 1 and [odds upper limit]
    // If number is 1, show shiny
    // Else, show default

    let imageContainer = document.getElementsByClassName("pokemonImage")[0];
    let imageElement = imageContainer.getElementsByTagName("IMG")[0];

    let shinyResult = Math.floor(Math.random() * 4) + 1;

    if (shinyResult == 1 ) {
        imageElement.src = dataToDisplay.sprites.front_shiny;
        console.log("Shiny Pokemon found!")
    } else {
        imageElement.src = dataToDisplay.sprites.front_default;
    }


    // document.querySelector(".pokemonImage img").src = dataToDisplay.sprites.front_default;



    let cryUrl = dataToDisplay.cries.latest;
    let pokemonAudioElement = document.querySelector(".pokemonCry audio");
    pokemonAudioElement.src = cryUrl;

    let pokemonAudioPlayButton = document.querySelector(".pokemonCry")
    pokemonAudioPlayButton.addEventListener("click", () => {
        pokemonAudioElement.volume = 0.1;
        pokemonAudioElement.play()
    });

}

// Button calls this
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data)

    putDataOnPage(data);
}

document.getElementById("create-encounter").addEventListener("click", getAndDisplayPokemonData);


// let pokemonButton = document.getElementById("create-encounter");
// pokemonButton.addEventListener("click", getAndDisplayPokemonData);


async function generateTeamData(){
    let teamArray = [];

    // for (let index = 0; index < 6; index++) {
    //     let data = await getPokemonData();
    //     teamArray.push(data);
    // }
    // teamArray = promiseAllResult;
    
    let promiseAllResult = await Promise.all([
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
    ]);

    return promiseAllResult;
}


async function showTeamData(teamToDisplay){
    let teamDisplaySection = document.getElementById("team-display");
    teamDisplaySection.innerHTML = ""

    teamToDisplay.forEach((pokemon) => {

        let newPokemonCard = document.createElement("div");

        // Pokemon Name
        let pokemonNameTitle = document.createElement("h3")
        pokemonNameTitle.textContent = pokemon.name

        newPokemonCard.appendChild(pokemonNameTitle);

        
        // Pokemon Types
        let type1Display = document.createElement("div");
        let type2Display = document.createElement("div");
        

        type1Display.textContent = "Type 1: " + pokemon.types[0].type.name;
        //  type1Display.textContent = data.types[0]["type"]["name"];
    
        if (pokemon.types[1]){
            // if the data includes a 2nd type, set that as well
            type2Display.textContent = "Type 2: " + pokemon.types[1].type.name;
        } else {
            // if no 2nd type exsits, reset the content in type2Display
            type2Display.textContent = "Type 2: ";
        }

        newPokemonCard.appendChild(type1Display);
        newPokemonCard.appendChild(type2Display);


        // Pokemon cry button
        let cryUrl = pokemon.cries.latest;
        let pokemonAudioElement = document.createElement("audio");
        pokemonAudioElement.src = cryUrl;
    
        let pokemonAudioPlayButton = document.createElement("button");
        pokemonAudioPlayButton.textContent = "Play Sound"
        pokemonAudioPlayButton.addEventListener("click", () => {
            pokemonAudioElement.volume = 0.1;
            pokemonAudioElement.play()
        });
        
        pokemonAudioPlayButton.appendChild(pokemonAudioElement);
        newPokemonCard.appendChild(pokemonAudioPlayButton);
        // Pokemon image and shiny chance
        
        
        // Apply all content to page
        teamDisplaySection.appendChild(newPokemonCard);

    });


}

async function getAndShowTeamData(){
    let teamData = await generateTeamData();
    console.log(teamData);
    showTeamData(teamData);
}


document.getElementById("create-team").addEventListener("click", getAndShowTeamData);

