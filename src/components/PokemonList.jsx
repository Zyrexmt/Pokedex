import PokemonCard from './PokemonCard'

function PokemonList({ pokemons }) {
  return (
    <section className="pokemon-grid">
      {pokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </section>
  )
}

export default PokemonList
