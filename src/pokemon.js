// const jsonFile = "/gen1_to_3_pokemon_data_with_forms.json";
// const pokemonList = document.querySelector(".card-list");

// fetch(jsonFile)
//     .then((response) => response.json())
//     .then((data) => {
//         data.forEach((pokemons) => {
//             const { image, name, type, type2, generation, pokedex_number, pokemonSpacer } = pokemons;
//             pokemonList.innerHTML += `
//         <div class="card">
//             <div class="card_img">
//                 <a href="./index.html"><img src="${image}" alt="${name}" loading="lazy"></a>
//             </div>
//             <div class="pokemon_info">
//                 <p class="pokemon_name">${name} <span class="pokemon_number">${pokedex_number}</span></p>
//                 <p class="pokemon_gen">${generation}</p>
//             </div>
//                 <p class="pokemon_type"><span class="${type}">${type}</span> ${pokemonSpacer} <span class="${type2}">${type2}</span></p>
//         </div>
//         `;
//         });
//     });

const jsonFile = "/all_pokemon_data_with_forms.json";
const pokemonList = document.querySelector(".card-list");
const loadMoreButton = document.getElementById("loadMore");

let allPokemon = [];        // holds all the Pokémon
let currentIndex = 0;       // tracks how many we’ve shown
const batchSize = 100;       // how many to show at a time

// Load the JSON and store data
fetch(jsonFile)
  .then((response) => response.json())
  .then((data) => {
    allPokemon = data;
    showNextBatch(); // show the first 50
  });

// Show the next batch of Pokémon
function showNextBatch() {
  const nextBatch = allPokemon.slice(currentIndex, currentIndex + batchSize);

  nextBatch.forEach((pokemons) => {
    const { image, name, type, type2, generation, pokedex_number, pokemonSpacer } = pokemons;

    pokemonList.innerHTML += `
      <div class="card">
        <div class="card_img">
          <a href="pokemon.html?name=${name}"><img src="${image}" alt="${name}" loading="lazy"></a>
        </div>
        <div class="pokemon_info">
          <p class="pokemon_name">${name} <span class="pokemon_number">${pokedex_number}</span></p>
          <p class="pokemon_gen">${generation}</p>
        </div>
        <p class="pokemon_type">
          <span class="${type}">${type}</span> ${pokemonSpacer || ""} <span class="${type2 || ""}">${type2 || ""}</span>
        </p>
      </div>
    `;
  });

  currentIndex += batchSize;

  // Hide button if we reached the end
  if (currentIndex >= allPokemon.length) {
    loadMoreButton.style.display = "none";
  }
}

// Load more when button is clicked
loadMoreButton.addEventListener("click", showNextBatch);

