import axios from 'axios';

const API_BASE_URL = 'https://backend-ruddy-psi-65.vercel.app/api';

// Función para obtener los filtros desde el backend
export const fetchFilters = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Filters`);
    return response.data;
  } catch (error) {
    console.error("Error fetching filters:", error);
    throw error;
  }
};

// Función para buscar Pokémon basado en el nombre
export const fetchPokemons = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Pokedoku?Name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Error al buscar Pokémon:", error);
    throw error;
  }
};

// Función para verificar si el Pokémon es correcto
export const verifyPokemon = async (pokemonName, condiciones) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Pokedoku`, {
      Name: pokemonName.toUpperCase(),
      condiciones,
    });
    return response.data;
  } catch (error) {
    console.error("Error al verificar el Pokémon:", error);
    throw error;
  }
};