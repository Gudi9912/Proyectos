import React, { useState, useEffect, useRef } from 'react';
import './Puzzle.css';
import axios from 'axios';

const Puzzle = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSuggestions, setPokemonSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [buttonColors, setButtonColors] = useState({});
  const [buttonImages, setButtonImages] = useState({});
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [rowHeaders, setRowHeaders] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({ rowFilter: '', colFilter: '' });

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get('https://backend-ruddy-psi-65.vercel.app/api/Filters');
        const filters = response.data;
        setColumnHeaders([filters.FilterX1, filters.FilterX2, filters.FilterX3]);
        setRowHeaders([filters.FilterY1, filters.FilterY2, filters.FilterY3]);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const fetchPokemons = async (name) => {
    if (!name) {
      setPokemonSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://backend-ruddy-psi-65.vercel.app/api/Pokedoku?Name=${name}`);
      setPokemonSuggestions(response.data); // Usamos la lista tal cual la envía el backend
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

  useEffect(() => {
    if (modalVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalVisible]);

  const handleClick = (rowIndex, colIndex) => {
    setSelectedCell({ rowIndex, colIndex });
    setCurrentFilters({ rowFilter: rowHeaders[rowIndex], colFilter: columnHeaders[colIndex] });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setPokemonName('');
    setPokemonSuggestions([]);
    setResultMessage('');
    setCurrentFilters({ rowFilter: '', colFilter: '' });
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
      const response = await axios.post('https://backend-ruddy-psi-65.vercel.app/api/Pokedoku', {
        Name: pokemonName.toUpperCase(),
        condiciones,
      });

      const { message, IdPokedex } = response.data;
      setResultMessage(message);

      setButtonColors((prevColors) => ({
        ...prevColors,
        [`${selectedCell.rowIndex}-${selectedCell.colIndex}`]:
          message === "El pokemon esta en la casilla correcta" ? 'green' : 'red',
      }));

      if (message === "El pokemon esta en la casilla correcta") {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${IdPokedex}.png`;
        setButtonImages((prevImages) => ({
          ...prevImages,
          [`${selectedCell.rowIndex}-${selectedCell.colIndex}`]: imageUrl,
        }));
      }

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
              >
                {buttonImages[`${rowIndex}-${colIndex}`] && (
                  <img
                    src={buttonImages[`${rowIndex}-${colIndex}`]}
                    alt="Pokemon"
                    className="button-image"
                  />
                )}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ingresa el nombre del Pokémon</h2>
            <p className="filters-applied">
    Filtros aplicados: <strong>{currentFilters.rowFilter}</strong> | <strong>{currentFilters.colFilter}</strong>
</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                ref={inputRef}
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
                placeholder="Nombre del Pokémon"
                required
              />
              {loading && <p>Buscando...</p>}
              <ul>
                {pokemonSuggestions.map((pokemon) => (
                  <li
                    key={pokemon.IdPokedex}
                    onClick={() => handleSuggestionClick(pokemon.Name)}
                  >
                    {pokemon.Name}
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.IdPokedex}.png`}
                      alt={pokemon.Name}
                      style={{ width: '30px', marginLeft: '10px' }}
                    />
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
