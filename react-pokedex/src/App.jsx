import { useState } from "react";
import "./App.css";

async function fetchRandomPokemon() {
  const id = Math.floor(Math.random() * 151);
  const url = "https://pokeapi.co/api/v2/pokemon/" + id;
  const response = await fetch(url);
  return await response.json();
}

function Pokemon({ name, image, liked, onLikeClick }) {
  return (
    <div className="box">
      <h2>{name}</h2>
      <img src={image} />
      <button
        className={`button ${liked ? "active" : ""}`}
        onClick={onLikeClick}
      >
        ❤️
      </button>
    </div>
  );
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  function handleClick(index) {
    const nextPokemonList = pokemonList.slice();
    nextPokemonList[index].liked = !nextPokemonList[index].liked;
    setPokemonList(nextPokemonList);
  }

  async function handleAddClick() {
    const pokemon = await fetchRandomPokemon();
    const nextPokemonList = pokemonList.slice();
    nextPokemonList.push({
      name: pokemon.name,
      liked: false,
      image: pokemon.sprites.front_default
    });
    setPokemonList(nextPokemonList);
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
        <button className="button" onClick={handleAddClick}>
          Add Pokémon
        </button>
      </div>
    </div>
  );
}

export default App;
