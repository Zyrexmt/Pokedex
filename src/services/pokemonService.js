// API onde buscamos os dados
const API_URL = 'https://pokeapi.co/api/v2'

// a requisição será feita aqui
// parâmetro url - a principal url da requisição
// ASYNC - uma requisição assincrona (chamadas se um limite de tempo, e serão feitas em algum momento)
async function request(url) {
  // capturar a resposta
  // AWAIT - aguardar a resposta (independente do tempo)
  // FETCH 
  /*
  GET - busca
  POST - envio
  PATCH - alteração
  PUT - inserção / alteração
  DELETE - exclusão
  */
  const response = await fetch(url);
  // toda requisição tem uma resposta e um status

  // se der problema na requisição
  if(!response.ok) {
    // retorna um novo erro
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}



export function getPokemons(limit = 20, offset = 0) {
  // lstar todos os pokemons, mas paginados
  // limit - quantos pokemons
  // offset - quantos pokemons limite por página
  return request(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
}

export function getPokemon(nameOrId) {
  return []
}

export function getTypes() {
  return request(`${API_URL}/type`);
}

export function getPokemonByType(type) {
  return request(`${API_URL}/type/${type}`);
}

// função que recebe uma lista de pokemons
// e deve retornar os dados de cada um
// usando a mesma função
export async function getPokemonDetails(pokemons) {
  // map - percorre o array / lista
  const requests =  pokemons.map( pokemon =>
    // request - faz a requisição para cada pokemon
    // por url
    request(pokemon.url)
    );

    return Promise.all(requests);
}
