// Get the "name" query parameter from the URL
const params = new URLSearchParams(window.location.search);
const nameParam = params.get("name");

const detailContainer = document.getElementById("pokemonDetail");
const loadingText = document.getElementById("loading");

// Fetch the full Pokémon data file
fetch("/all_pokemon_data_with_forms.json")
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
      <div class="pokemon-card">
        <img src="${pokemon.image}" alt="${pokemon.name}" />
        <h1>${pokemon.name} <span>${pokemon.pokedex_number}</span></h1>
        <p><strong>Generation:</strong> ${pokemon.generation}</p>
        <p><strong>Type:</strong> 
          <span class="${pokemon.type}">${pokemon.type}</span> 
          ${pokemon.pokemonSpacer || ""} 
          <span class="${pokemon.type2 || ""}">${pokemon.type2 || ""}</span>
        </p>
        <a href="pokemon-db.html">← Back to List</a>
      </div>
    `;
  })
  .catch((err) => {
    console.error("Error loading Pokémon:", err);
    loadingText.textContent = "Failed to load Pokémon.";
  });
