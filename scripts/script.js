const pokedex = document.getElementById('pokedex');
console.log(pokedex);

const fetchPokemon = () => {

    const promises = [];
    for (let i = 0; i < 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        promises.push(fetch(url).then((response) => response.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({ // you need parentheses when you return an object ({object})
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types
                .map(type => type.type.name)
                .join(", ")
        }));
        displayPokemon(pokemon);
    });
}

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map((pokemon) =>
        `
        <li class = 'card'>
        <img class = 'card-image' src ="${pokemon.image}">
        <h2 class = 'card-title'> ${pokemon.id}. ${pokemon.name}</h2>
        <p = 'card-type'>Type: ${pokemon.type}</p>
        </li> 
        `
    ).join('');
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();