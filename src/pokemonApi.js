
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
    let imageContainer = document.getElementsByClassName("pokemonImage")[0];
    let imageElement = imageContainer.getElementsByTagName("IMG")[0];

    imageElement.src = dataToDisplay.sprites.front_default;

    // document.querySelector(".pokemonImage img").src = dataToDisplay.sprites.front_default;

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

