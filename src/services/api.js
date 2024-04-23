export const PokeApi = {
  BASE_URL: "https://pokeapi.co/api/v2/pokemon",
}

PokeApi.getPokemon = async (idOrName) => {
  const url = `${PokeApi.BASE_URL}/${idOrName}`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao obter dados. Código de status: ${response.status}`)
    }
    const data = await response.json();
    return data      
  } catch (error) {
    return error.message
  }
}

PokeApi.getPokemonSerie = async (offset = 0, limit = 10) => {
  const url = `${PokeApi.BASE_URL}?offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao obter dados. Código de status: ${response.status}`)
    }
    const data = await response.json();
    return data
  } catch (error) {
    return error.message
  }
}