import React, { useState, useEffect } from 'react';
import './Puzzle.css';
import axios from 'axios';

const Puzzle = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSuggestions, setPokemonSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [buttonColors, setButtonColors] = useState({}); // Estado para manejar los colores de los botones

  const columnHeaders = ['MONOTYPE', 'LEGENDARY', 'INITIAL'];
  const rowHeaders = ['ELECTRIC', 'FIRE', 'ICE'];

  const fetchPokemons = async (name) => {
    if (!name) {
      setPokemonSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/Pokedoku?Name=${name}`);
      setPokemonSuggestions(response.data);
    } catch (error) {
      console.error("Error al buscar Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPokemons(pokemonName);
    }, 500);

    return () => clearTimeout(timer);
  }, [pokemonName]);

  const handleClick = (rowIndex, colIndex) => {
    setSelectedCell({ rowIndex, colIndex });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setPokemonName('');
    setPokemonSuggestions([]);
    setResultMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCell || !pokemonName) {
      return;
    }

    const condiciones = {
      Condicion1: rowHeaders[selectedCell.rowIndex],
      Condicion2: columnHeaders[selectedCell.colIndex],
    };

    try {
      const response = await axios.post('http://localhost:3000/api/Pokedoku', {
        Name: pokemonName.toUpperCase(),
        condiciones,
      });

      const { message } = response.data;
      setResultMessage(message);

      // Cambiar el color del botón según el mensaje de la respuesta
      setButtonColors((prevColors) => ({
        ...prevColors,
        [`${selectedCell.rowIndex}-${selectedCell.colIndex}`]:
          message === "El pokemon esta en la casilla correcta" ? 'green' : 'red',
      }));

      handleModalClose();
    } catch (error) {
      console.error("Error al verificar el Pokémon:", error);
      setResultMessage('Hubo un error al verificar el Pokémon.');
    }
  };

  const handleSuggestionClick = (name) => {
    setPokemonName(name);
    setPokemonSuggestions([]);
  };

  return (
    <div className="puzzle-container">
      <h1>Puzzle de Hoy</h1>
      <div className="puzzle-board">
        <div className="puzzle-header empty"></div>
        {columnHeaders.map((header, colIndex) => (
          <div key={colIndex} className="puzzle-header">{header}</div>
        ))}

        {rowHeaders.map((rowHeader, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="puzzle-header">{rowHeader}</div>
            {columnHeaders.map((_, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className="puzzle-button"
                style={{
                  backgroundColor: buttonColors[`${rowIndex}-${colIndex}`] || 'white',
                }}
                onClick={() => handleClick(rowIndex, colIndex)}
              ></button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ingresa el nombre del Pokémon</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
                placeholder="Nombre del Pokémon"
                required
              />
              {loading && <p>Buscando...</p>}
              <ul>
                {pokemonSuggestions
                  .filter((pokemon) => pokemon.Name.toLowerCase() !== pokemonName.toLowerCase())
                  .map((pokemon) => (
                    <li
                      key={pokemon.IdPokedex}
                      onClick={() => handleSuggestionClick(pokemon.Name)}
                    >
                      {pokemon.Name}
                    </li>
                  ))}
              </ul>
              <div className="button-container">
                <button type="submit">Aceptar</button>
                <button type="button" onClick={handleModalClose}>Cancelar</button>
              </div>
            </form>
            {resultMessage && <p>{resultMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Puzzle;
