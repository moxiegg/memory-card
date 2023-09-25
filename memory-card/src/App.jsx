import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
function App() {
  const [users, setData] = useState([]);
  const fetched = useRef(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function resetArray() {
    const temp = [...users];
    const newArr = temp.map((obj) => {
      if (obj.isClicked) obj.isClicked = false;
      return obj;
    });
    shuffleArray(newArr);
  }

  function checkClick(id) {
    let flag = false;
    users.forEach((obj) => {
      if (obj.id == id) {
        if (obj.isClicked) {
          flag = true;
        }
      }
    });
    return flag;
  }

  function handleClick(e) {
    const id = e.currentTarget.dataset.id;
    let flag = checkClick(id);
    console.log(id + " " + flag);
    if (!flag) {
      const temp = users.map((obj) => {
        if (obj.id === id) {
          obj.isClicked = true;
        }
        return obj;
      });
      shuffleArray(temp);
      if (score + 1 > bestScore) setBestScore(score + 1);
      setScore(score + 1);
    } else {
      setScore(0);
      resetArray();
    }
  }

  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    setData(array);
    console.log(array);
  }

  const fetchPokemonData = (pokemon) => {
    let url = pokemon.url;
    // console.log(url); // This saves the pokemon URL to use in a fetch (e.g., https://pokeapi.co/api/v2/pokemon/1/)
    return fetch(url)
      .then((response) => response.json())
      .then(function (pokeData) {
        return {
          id: uuid(),
          name: pokemon.name,
          img: pokeData.sprites.front_default,
          isClicked: false,
        };
      });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=24"
      );
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
    if (!fetched.current) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="scorecard">
        <div>Score : {score}</div>
        <div>Best Score : {bestScore}</div>
      </div>
      <div className="container">
        {users.length > 0 && (
          <div className="cards">
            {users.map((user) => (
              <div
                className="poke-container"
                key={user.id}
                onClick={handleClick}
                data-id={user.id}
              >
                <img src={user.img} alt={user.name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
