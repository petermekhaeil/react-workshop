# Data Fetching

## Fetching data from API

Using the `fetch` Web API to request data from an external API:

```js
async function fetchPokemon(id) {
  const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
  const response = await fetch(url);
  return await response.json();
}
```

Adding interactivity to fetch Pokemon:

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

## Data Fetching Libraries

- Modern frameworks provide efficient data fetching mechanisms (eg [Next.js](https://nextjs.org/), [Remix](https://remix.run/)).
- Otherwise, consider using a client-side cache: [React Query](https://tanstack.com/query/v3/), [SWR](https://swr.vercel.app/), [React Router 6.4+](https://reactrouter.com/en/main/start/overview).
- If using Redux, [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) provides data fetching and caching.

React documentation has notes regarding data fetching:

- [useEffect: Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects)
- [You Might Not Need an Effect](
https://react.dev/learn/you-might-not-need-an-effect#fetching-data)
- [Syncronizing with Effects](https://react.dev/learn/synchronizing-with-effects#fetching-data)

