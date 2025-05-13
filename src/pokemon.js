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

const jsonFile = "/gen1_to_3_pokemon_full_data.json";
const pokemonList = document.querySelector(".card-list");
const paginationContainer = document.getElementById("pagination");

const itemsPerPage = 52;
const maxPagesVisible = 5;

let allPokemon = [];
let currentPage = 1;

// Fetch data
fetch(jsonFile)
  .then((response) => response.json())
  .then((data) => {
    allPokemon = data;
    renderPage(currentPage);
    renderPagination();
  });

// Render cards for the given page
function renderPage(page) {
  pokemonList.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const batch = allPokemon.slice(start, end);

  batch.forEach((pokemon) => {
    const { image, name, type, type2, generation, pokedex_number, pokemonSpacer } = pokemon;

    pokemonList.innerHTML += `
      <div class="card">
        <div class="card_img">
          <a href="pokemon.html?name=${encodeURIComponent(name)}">
            <img src="${image}" alt="${name}" loading="lazy">
          </a>
        </div>
        <div class="pokemon_info">
          <p class="pokemon_name">${name} <span class="pokemon_number">${pokedex_number}</span></p>
          <p class="pokemon_gen">${generation}</p>
        </div>
        <p class="pokemon_type">
          <span class="${type}">${type}</span> ${pokemonSpacer || ""} 
          <span class="${type2}">${type2}</span>
        </p>
      </div>
    `;
  });
}

// Render pagination controls
function renderPagination() {
  const totalPages = Math.ceil(allPokemon.length / itemsPerPage);
  paginationContainer.innerHTML = "";

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesVisible / 2));
  let endPage = startPage + maxPagesVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesVisible + 1);
  }

  // Prev button
  if (currentPage > 1) {
    const prevBtn = createPageButton("« Prev", currentPage - 1);
    paginationContainer.appendChild(prevBtn);
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = createPageButton(i, i);
    if (i === currentPage) pageBtn.classList.add("active");
    paginationContainer.appendChild(pageBtn);
  }

  // Next button
  if (currentPage < totalPages) {
    const nextBtn = createPageButton("Next »", currentPage + 1);
    paginationContainer.appendChild(nextBtn);
  }
}

function createPageButton(text, page) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.addEventListener("click", () => {
    currentPage = page;
    renderPage(currentPage);
    renderPagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return btn;
}
