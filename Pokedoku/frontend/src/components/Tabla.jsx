import React, { useState, useEffect, useRef } from 'react';
import './Puzzle.css';
import { fetchFilters, fetchPokemons, verifyPokemon } from '../services/puzzle.service.js';
import Modal from './ModalPuzzle';

const Puzzle = () => {
  // Estados para controlar la visibilidad del modal y la celda seleccionada
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  // Estados para manejar el nombre del Pokémon, sugerencias y carga
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSuggestions, setPokemonSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados para mensajes de resultado, colores de botones e imágenes
  const [resultMessage, setResultMessage] = useState('');
  const [buttonColors, setButtonColors] = useState({});
  const [buttonImages, setButtonImages] = useState({});

  // Estados para los encabezados de columnas y filas
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [rowHeaders, setRowHeaders] = useState([]);

  // Estado para los filtros actuales
  const [currentFilters, setCurrentFilters] = useState({ rowFilter: '', colFilter: '' });

  // Referencia para el input del modal
  const inputRef = useRef(null);

  // Efecto para cargar los filtros al montar el componente
  useEffect(() => {
    const loadFilters = async () => {
      const filters = await fetchFilters();
      setColumnHeaders([filters.FilterX1, filters.FilterX2, filters.FilterX3]);
      setRowHeaders([filters.FilterY1, filters.FilterY2, filters.FilterY3]);
    };
    loadFilters();
  }, []);

  // Efecto para buscar Pokémon después de un retraso al escribir en el input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pokemonName) {
        setLoading(true);
        fetchPokemons(pokemonName).then((data) => {
          setPokemonSuggestions(data);
          setLoading(false);
        });
      } else {
        setPokemonSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pokemonName]);

  // Efecto para enfocar el input cuando el modal se abre
  useEffect(() => {
    if (modalVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalVisible]);

  // Función para manejar el clic en una celda del tablero
  const handleClick = (rowIndex, colIndex) => {
    setSelectedCell({ rowIndex, colIndex });
    setCurrentFilters({ rowFilter: rowHeaders[rowIndex], colFilter: columnHeaders[colIndex] });
    setModalVisible(true);
  };

  // Función para cerrar el modal y resetear estados
  const handleModalClose = () => {
    setModalVisible(false);
    setPokemonName('');
    setPokemonSuggestions([]);
    setResultMessage('');
    setCurrentFilters({ rowFilter: '', colFilter: '' });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCell || !pokemonName) return;

    const condiciones = {
      Condicion1: rowHeaders[selectedCell.rowIndex],
      Condicion2: columnHeaders[selectedCell.colIndex],
    };

    try {
      // Se hace la conexión con el back para comprobar si el Pokémon es correcto
      const { message, IdPokedex } = await verifyPokemon(pokemonName, condiciones);
      setResultMessage(message);

      // Se cambia el color de la casilla a rojo o verde, según sea correcto o no
      setButtonColors((prevColors) => ({
        ...prevColors,
        [`${selectedCell.rowIndex}-${selectedCell.colIndex}`]:
          message === "El pokemon esta en la casilla correcta" ? 'green' : 'red',
      }));

      // Se busca la imagen del Pokémon, según su id, en un repositorio de GitHub
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

  // Función para manejar el clic en una sugerencia de Pokémon
  const handleSuggestionClick = (name) => {
    setPokemonName(name);
    setPokemonSuggestions([]);
  };

  return (
    <div className="puzzle-container">
      <h1>Puzzle de Hoy</h1>
      {/* Se crea el tablero con los botones y los filtros */}
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
      {/* Modal para escribir el nombre del Pokémon */}
      <Modal
        modalVisible={modalVisible}
        handleModalClose={handleModalClose}
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        loading={loading}
        pokemonSuggestions={pokemonSuggestions}
        handleSuggestionClick={handleSuggestionClick}
        handleSubmit={handleSubmit}
        currentFilters={currentFilters}
        resultMessage={resultMessage}
        inputRef={inputRef}
      />
    </div>
  );
};

export default Puzzle;