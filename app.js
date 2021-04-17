    //aqui fara a busca na API pelo ID
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    //Metodo fetch serve para fazer requisição AJAX
    //AJAX possibilita o código fazer requisições assíncronas para que dados sejam obtidos sem que a pagina seja recarregada
    //fetch é um metodo que ao ser invocado faz uma requisção HTTP


    const pokemonPromises =[];
    for (let i = 1; i <= 149; i++) {
        //aqui retorna a resposta, transformando em um arquivo JSON
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))

    }
    //aqui recebe um array das promisses
    Promise.all(pokemonPromises)
    .then(pokemons =>{
        
        //Aqui reduz(REDUCE) o array da API em uma string
        const lisPokemons = pokemons.reduce((accumulator, pokemon) =>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumulator += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
           <h2 class="card-title"> ${pokemon.id}. ${pokemon.name}</h2>
           <p class="card-subtitle">${pokemon.types.map(typeInfo => typeInfo.type.name).join(' | ')}</p>
           </li>`
          // acima criando uma função typeInfo para retornar o objeto do array*/
            return accumulator;

        }, '')
        const ul = document.querySelector('[data-js="pokedex"]')
        //mostrando na tela a lista de pokemons
        ul.innerHTML = lisPokemons;

    })
}
fetchPokemon();