import { useState } from "react";
import "./App.css";

async function fetchRandomPokemon() {
  const id = Math.floor(Math.random() * 151);
  const url = "https://pokeapi.co/api/v2/pokemon/" + id;
  const response = await fetch(url);
  return await response.json();
}

function Pokemon({ name, image, onNextClick }) {
  return (
    <div className="box">
      <h2>{name}</h2>
      <img src={image} />
      <button className="button" onClick={onNextClick}>
        Next
      </button>
    </div>
  );
}

function App() {
  const [pokemons, setPokemons] = useState([]);

  async function handleNextClick(index) {
    const pokemon = await fetchRandomPokemon();
    const nextPokemons = pokemons.slice();
    nextPokemons[index] = pokemon;
    setPokemons(nextPokemons);
  }

  async function handleAddClick() {
    const pokemon = await fetchRandomPokemon();
    const nextPokemons = pokemons.slice();
    nextPokemons.push(pokemon);
    setPokemons(nextPokemons);
  }

  return (
    <div className="App">
      <h1>React Pokédex</h1>
      <div className="row">
        {pokemons.map((pokemon, index) => {
          return (
            <Pokemon
              key={index}
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              onNextClick={() => handleNextClick(index)}
            />
          );
        })}
      </div>
      <button className="button" onClick={handleAddClick}>
        Add
      </button>
    </div>
  );
}

export default App;
