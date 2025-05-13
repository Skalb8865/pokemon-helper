// Get the "name" query parameter from the URL
const params = new URLSearchParams(window.location.search);
const nameParam = params.get("name");

const detailContainer = document.getElementById("pokemonDetail");
const loadingText = document.getElementById("loading");

// Fetch the full Pokémon data file
fetch("/gen1_to_3_pokemon_full_data.json")
  .then((res) => res.json())
  .then((data) => {
    // Find the Pokémon by name (case-insensitive)
    const pokemon = data.find((p) => p.name.toLowerCase() === nameParam?.toLowerCase());

    if (!pokemon) {
      loadingText.textContent = "Pokémon not found.";
      return;
    }

    // Hide loading text and show the details
    loadingText.style.display = "none";
    detailContainer.style.display = "block";

    // Build the Pokémon detail card
    detailContainer.innerHTML = `
      <div class="pokemon_container">
        <a href="pokemon-db.html">← Back to List</a>
        <div class="image_container">
          <div class="pokemon_image">          
            <img src="${pokemon.image}" alt="${pokemon.name}" />
          </div>
          <div class="pokemon_image">
            <img src="${pokemon.shiny_image}" alt="Shiny ${pokemon.name}" />
          </div>
          <div class="pokemon_card">
            <img src="${pokemon.card_image}" alt="${pokemon.name} Pokemon Card" />
          </div>    
        </div>
        <h1 class="pokemon_info--name">${pokemon.name} <span>${pokemon.pokedex_number}</span></h1>
        <p>${pokemon.description}</p>
        <p><strong>Generation:</strong> ${pokemon.generation}</p>
        <p class="pokemon_type"><strong>Type:</strong> 
          <span class="${pokemon.type}">${pokemon.type}</span> 
          ${pokemon.pokemonSpacer || ""} 
          <span class="${pokemon.type2 || ""}">${pokemon.type2 || ""}</span>
        </p>
        <p>Abilities: ${pokemon.abilities}</p>
        <p>HP: ${pokemon.hp}</p>
        <p>Attack: ${pokemon.attack}</p>
        <p>Defense: ${pokemon.defense}</p>
        <p>Special Attack: ${pokemon.special_attack}</p>
        <p>Special Defense: ${pokemon.special_defense}</p>
        <p>Speed: ${pokemon.speed}</p>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
      </div>
    `;
  })
  .catch((err) => {
    console.error("Error loading Pokémon:", err);
    loadingText.textContent = "Failed to load Pokémon.";
  });
