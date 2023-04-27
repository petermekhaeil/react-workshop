# Building a React app

## What are we building?

![react-workshop-pokedex vercel app_ (1)](https://user-images.githubusercontent.com/4616064/234523674-55a3525e-d2fb-4f40-a8bf-483b39819152.png)

- Demo: https://petermekhaeil.com/react-pokedex
- Source: https://github.com/petermekhaeil/react-workshop/tree/master/react-pokedex

## Building the UI

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

## Passing data through props

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

## Making it interactive

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

## Lifting state up

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
