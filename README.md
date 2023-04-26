# React Workshop

## Prequisities

### Set up your development environment

- Install [Node.js](https://nodejs.org/en).
- Install [VS Code](https://code.visualstudio.com/).
- Install [React Developer Tools](https://react.dev/learn/react-developer-tools).

#### Recommended VS Code Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Reading Material

- The React documentation has a tutorial on learning React: [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe).

## Building a React app

Below are the notes from each session. 

### What are we building?

- Demo: 
- Source: https://github.com/petermekhaeil/react-workshop/tree/master/react-pokedex

### Building the UI

```jsx
function App() {
  return (
    <div className="App">
      <h1>React Pokédex</h1>
      <div className="row">
        <div className="box">
          <h2>Bulbasaur</h2>
        </div>
        <div className="box">
          <h2>Charmander</h2>
        </div>
        <div className="box">
          <h2>Squirtle</h2>
        </div>
      </div>
    </div>
  );
}
```

### Passing data through props

Create a `Pokemon` component and pass the Pokemon name as a prop:

```jsx
function Pokemon({ name }) {
  return (
    <div className="box">
      <h2>{name}</h2>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>React Pokédex</h1>
      <div className="row">
        <Pokemon name="Bulbasaur" />
        <Pokemon name="Charmander" />
        <Pokemon name="Squirtle" />
      </div>
    </div>
  );
}
```

### Making it interactive

Adding a state to the `Pokemon` component and a click handler to update the state:

```jsx
function Pokemon({ name }) {
  const [liked, setLiked] = useState(false);

  function handleClick() {
    const prevLike = liked;
    setLiked(!prevLike);
  }

  return (
    <div className="box">
      <h2>{name}</h2>
      <button
        className={`button ${liked ? "active" : ""}`}
        onClick={handleClick}
      >
        ❤️
      </button>
    </div>
  );
}
```

### Lifting state up

Lifting the state and click handler outside of the `Pokemon` component:

```jsx
function Pokemon({ name, liked, onLikeClick }) {
  return (
    <div className="box">
      <h2>{name}</h2>
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

  return (
    <div className="App">
      <h1>React Pokédex</h1>
      <div className="row">
        <Pokemon
          name={pokemonList[0].name}
          onLikeClick={() => handleLikeClick(0)}
          liked={pokemonList[0].liked}
        />
        <Pokemon
          name={pokemonList[1].name}
          onLikeClick={() => handleLikeClick(1)}
          liked={pokemonList[1].liked}
        />
        <Pokemon
          name={pokemonList[2].name}
          onLikeClick={() => handleLikeClick(2)}
          liked={pokemonList[2].liked}
        />
      </div>
    </div>
  );
}
```

Map through the list of items:

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
      </div>
    </div>
  );
}
```

## Data Fetching

### Fetching data from API

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

### Error handling

## Testing React applications

- Setting up a test suite


## Building a React component library

- Setting up the library
- Building the library
- Versioning
- Publishing
- Importing
