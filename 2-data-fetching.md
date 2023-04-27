# Data Fetching

## Fetching data from API

Adding interactivity to fetch more Pokemon:

```jsx
function App() {
  const [pokemonList, setPokemonList] = useState([
    { name: "Bulbasaur", liked: false },
    { name: "Charmander", liked: false },
    { name: "Squirtle", liked: false }
  ]);

  function handleLikeClick(index) {
    const nextPokemonList = pokemonList.slice();
    nextPokemonList[index].liked = !nextPokemonList[index].liked;
    setPokemonList(nextPokemonList);
  }

  async function handleAddClick() {
    const pokemon = await fetchRandomPokemon();
    const nextPokemonList = pokemonList.slice();
    nextPokemonList.push({
      name: pokemon.name,
      liked: false
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
              onLikeClick={() => handleLikeClick(index)}
              liked={pokemon.liked}
            />
          );
        })}
        <button className="button" onClick={handleAddClick}>
          Add
        </button>
      </div>
    </div>
  );
}
```

## Error handling

Try-catch errors returned from responses that failed:

```jsx
const [error, setError] = useState(false);

async function handleAddClick(isRandom) {
  setError(false);
  try {
    let pokemon = await fetchRandomPokemon();

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
```
