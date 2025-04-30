const jsonFile = "/gen1_to_3_pokemon_data_with_forms.json";
const pokemonList = document.querySelector(".card-list");

fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((pokemons) => {
            const { image, name, type, type2, generation, pokedex_number, pokemonSpacer } = pokemons;
            pokemonList.innerHTML += `
        <div class="card">
            <div class="card_img">
                <a href="./index.html"><img src="${image}" alt="${name}"></a>
            </div>
            <div class="pokemon_info">
                <p class="pokemon_name">${name} <span class="pokemon_number">${pokedex_number}</span></p>
                <p class="pokemon_gen">${generation}</p>
            </div>
                <p class="pokemon_type"><span class="${type}">${type}</span> ${pokemonSpacer} <span class="${type2}">${type2}</span></p>
        </div>
        `;
        });
    });
