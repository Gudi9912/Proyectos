import React from 'react';

const Modal = ({
  modalVisible,
  handleModalClose,
  pokemonName,
  setPokemonName,
  loading,
  pokemonSuggestions,
  handleSuggestionClick,
  handleSubmit,
  currentFilters,
  resultMessage,
  inputRef,
}) => {
  if (!modalVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Ingresa el nombre del Pokémon</h2>
        {/* Muestra los filtros aplicados */}
        <p className="filters-applied">
          Filtros aplicados: <strong>{currentFilters.rowFilter}</strong> |{' '}
          <strong>{currentFilters.colFilter}</strong>
        </p>
        <form onSubmit={handleSubmit}>
            {/* Input para escribir el nombre del Pokémon */}
          <input
            type="text"
            ref={inputRef}
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Nombre del Pokémon"
            required
          />
          {/* Muestra un mensaje de carga mientras se buscan sugerencias */}
          {loading && <p>Buscando...</p>}
          {/* Lista de sugerencias de Pokémon */}
          <ul>
            {pokemonSuggestions.map((pokemon) => (
              <li
                key={pokemon.IdPokedex}
                onClick={() => handleSuggestionClick(pokemon.Name)}
              >
                {pokemon.Name}
                {/* Muestra la imagen del Pokémon sugerido */}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.IdPokedex}.png`}
                  alt={pokemon.Name}
                  style={{ width: '30px', marginLeft: '10px' }}
                />
              </li>
            ))}
          </ul>
          {/* Botones para aceptar o cancelar */}
          <div className="button-container">
            <button type="submit">Aceptar</button>
            <button type="button" onClick={handleModalClose}>
              Cancelar
            </button>
          </div>
        </form>
        {/* Muestra el mensaje de resultado después de verificar el Pokémon */}
        {resultMessage && <p>{resultMessage}</p>}
      </div>
    </div>
  );
};

export default Modal;