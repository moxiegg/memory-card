import { useEffect, useState, useRef } from "react";
import {v4 as uuid} from 'uuid';
import './App.css'
function App() {
  const [users, setData] = useState([]);
  const fetched = useRef(false);

  function shuffleArray() {

    const array=[...users]
    array.sort(() => Math.random() - 0.5);
    setData(array)
    console.log(array)
  }

  const fetchPokemonData = (pokemon) => {
    let url = pokemon.url;
    console.log(url); // This saves the pokemon URL to use in a fetch (e.g., https://pokeapi.co/api/v2/pokemon/1/)
    return fetch(url)
      .then((response) => response.json())
      .then(function (pokeData) {
        return {
          id:uuid(),
          name: pokemon.name,
          img: pokeData.sprites.front_default,
          isClicked:false
        };
      });
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=36");
      const data = await response.json();
      const promises = data.results.map(fetchPokemonData);

      const filteredPromises = promises.filter((_, index) => index % 3 === 0);

      // Wait for all the filtered promises to resolve using Promise.all
      const filteredPokemonData = await Promise.all(filteredPromises);

      setData(filteredPokemonData);
      fetched.current = true;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      fetchData();
    }
  }, []);


  return (
    <div>
      {users.length}
      {users.length > 0 && (
        <div className="cards">
          {users.map((user) => (
            <div className="container" key={user.id} onClick={shuffleArray}>
              <img src={user.img} alt={user.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
