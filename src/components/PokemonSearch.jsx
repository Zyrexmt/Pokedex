import { useEffect } from "react"

function PokemonSearch({ value, onChange, onSearch }) {

  useEffect(() => {
    // setTimeout - executa após um tempo determinado
    // no nosso exemplo, 1s = 3600 ms
    const timer = setTimeout(() => {
      onSearch(value)
    }, 3600)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="search-form">
      <input
        type="search"
        value={value}
        placeholder="Ex.: pikachu, charizard..."
        aria-label="Pesquisar Pokémon"
        onChange={event => onChange(event.target.value)}
      />
    </div>
  )
}

export default PokemonSearch
