import { useEffect, useState ,useRef} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [users, setData] = useState([]);
  const fetched = useRef(false);
  const fetchPokemonData=(pokemon)=>{
      let url = pokemon.url
      console.log(url) // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
        fetch(url)
        .then(response => response.json())
        .then(function(pokeData){
  
        setData([{name:pokemon.name,img:pokeData.sprites.front_default}])
        })
  }
  const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.results);
        data.results.forEach(function(pokemon){
          console.log(pokemon)
          fetchPokemonData(pokemon); 
        })
      })
      .catch((error)=>{
        console.log(error)
      });
  };
  useEffect(() => {
    if(fetched.current)return;
    fetched.current=true;
    fetchData();
    // setCounter(count + 1);
  }, []);
  return (
    <div>
      {users.length}
      {users.length > 0 && (
        <ul>
          {users.map((user,ind) => (
            <div>
            <li key={ind}>{user.name}</li>
            <img src={user.img}></img>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
