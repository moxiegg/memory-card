/* eslint-disable react/prop-types */
export default function Cardlist({ list, handleClick }) {
  return (
    <div className="cards">
      {list.map((pokemon) => (
        <div
          className="poke-container"
          data-id={pokemon.id}
          onClick={handleClick}
          key={pokemon.id}
        >
          <img src={pokemon.img} alt={pokemon.name} />
        </div>
      ))}
    </div>
  );
}
