function PokemonCard({ pokemon }) {
  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default

  return (
    <article className="pokemon-card">
      <div className="pokemon-image-area">
        {image ? (
          <img
            src={image}
            alt={`Imagem do Pokémon ${pokemon.name}`}
          />
        ) : (
          <span>Sem imagem</span>
        )}
      </div>

      <div className="pokemon-card-content">
        <p className="pokemon-number">
          #{String(pokemon.id).padStart(3, '0')}
        </p>

        <h3>{pokemon.name}</h3>

        <div className="pokemon-types">
          {pokemon.types.map(item => (
            <span
              className="type-badge"
              key={item.type.name}
            >
              {item.type.name}
            </span>
          ))}
        </div>

        <div className="pokemon-info">
          <span>
            <strong>Altura:</strong> {pokemon.height / 10} m
          </span>

          <span>
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </span>
        </div>
      </div>
    </article>
  )
}

export default PokemonCard
