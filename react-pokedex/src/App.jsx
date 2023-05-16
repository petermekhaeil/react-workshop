import { useRef, useState } from 'react';
import './App.css';

async function fetchPokemon(id) {
  const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
  const response = await fetch(url);
  return await response.json();
}

async function fetchRandomPokemon() {
  const id = Math.floor(Math.random() * 151);
  return fetchPokemon(id);
}

function Pokemon({ name, image, liked, onLikeClick }) {
  return (
    <div className="box">
      <h2>{name}</h2>
      <img src={image} />
      <button
        className={`button ${liked ? 'active' : ''}`}
        onClick={onLikeClick}
      >
        ❤️
      </button>
    </div>
  );
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const inputRef = useRef(null);
  const [error, setError] = useState(false);

  function handleClick(index) {
    const nextPokemonList = pokemonList.slice();
    nextPokemonList[index].liked = !nextPokemonList[index].liked;
    setPokemonList(nextPokemonList);
  }

  async function handleAddClick(isRandom) {
    setError(false);
    try {
      let pokemon;

      if (isRandom) {
        pokemon = await fetchRandomPokemon();
      } else {
        pokemon = await fetchPokemon(inputRef.current.value);
      }

      const nextPokemonList = pokemonList.slice();
      nextPokemonList.push({
        name: pokemon.name,
        liked: false,
        image: pokemon.sprites.front_default
      });
      setPokemonList(nextPokemonList);
    } catch {
      setError(true);
    }
  }

  return (
    <div className="App">
      <h1>React Pokédex</h1>
      <div className="row">
        {pokemonList.map((pokemon, index) => {
          return (
            <Pokemon
              key={index}
              name={pokemon.name}
              onLikeClick={() => handleClick(index)}
              liked={pokemon.liked}
              image={pokemon.image}
            />
          );
        })}
      </div>
      <div className="row">
        <input className="input" placeholder="Pokemon" ref={inputRef} />
      </div>
      <div className="row">
        <button className="button" onClick={() => handleAddClick(false)}>
          Add
        </button>
        <button className="button yellow" onClick={() => handleAddClick(true)}>
          Random
        </button>
      </div>
      <div className="row">
        {error && (
          <div className="error">
            <p>Pokemon not found</p>
            <img
              width={220}
              src={`${import.meta.env.BASE_URL}/sad-pikachu.webp`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
