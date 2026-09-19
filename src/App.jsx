import { useEffect, useState } from 'react'
import './App.css'

import Loading from './components/Loading'
import Pagination from './components/Pagination'
import PokemonList from './components/PokemonList'
import PokemonSearch from './components/PokemonSearch'
import TypeFilter from './components/TypeFilter'

import {
  getPokemon, 
  getPokemonByType,
  getPokemonDetails,
  getPokemons,
  getTypes,
  searchByNameAndType
} from './services/pokemonService'

const LIMIT = 20

function App() {
  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])

  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadPokemonList(currentPage = 0) {
    try {
      setLoading(true)
      setError('')

      const offset = currentPage * LIMIT

      // primeiro passo: buscar os pokemons (lista)
      const data = await getPokemons(LIMIT, offset)

      // segundo passo: buscar os detalhes de cada um
      const details = await getPokemonDetails(data.results)

      // terceiro passo: atualizar
      setPokemons(details)
      setTotal(data.count || 0)
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar os Pokémon.')
    } finally {
      setLoading(false)
    }
  }

  async function loadTypes() {
    try {
      const data = await getTypes()
      setTypes(data.results)
    } catch (err) {
      console.error('Erro ao carregar tipos:', err)
    }
  }

  useEffect(() => {
    loadTypes()
  }, [])

  useEffect(() => {
    if (!selectedType && !search.trim()) {
      loadPokemonList(page)
    }
  }, [page])

  async function handleSearch(value) {
    // trim - remove espaços em branco
    // toLowerCase - todo o texto em minusculo
    const searchValue = value.trim().toLowerCase();

    // Caso de pesquisa vazia
    if(!searchValue && !selectedType) {
      setPage(0)
      await loadPokemonList(0)
      return
    }

    await filterPokemons(searchValue, selectedType)
  }

  async function handleTypeChange(type) {
    setSelectedType(type)
    setSearch('')
    setPage(0)

    if (!type) {
      await loadPokemonList(0)
      return
    }

    try {
      setLoading(true)
      setError('')

      const data = await getPokemonByType(type)

      const basicList = data.pokemon
        .slice(0, 60)
        .map(item => item.pokemon)

      const details = await getPokemonDetails(basicList)

      setPokemons(details)
      setTotal(details.length)
    } catch (err) {
      console.error(err)
      setPokemons([])
      setError('Não foi possível filtrar os Pokémon por tipo.')
    } finally {
      setLoading(false)
    }
  }

  async function  filterPokemons(name, type) {
    try {
      setLoading(true)
      setError('')

      const results = await searchByNameAndType(name, type)

      setPokemons(results)
      setTotal(results.length)
      setPage(0)
    } catch (error) {
      console.error(error)
      setPokemons([])
      setError('Não foi possível pesquisar os Pokémons')
    } finally {
      setLoading(false)

    }
  }

  async function handleClearFilters() {
    setSearch('')
    setSelectedType('')
    setPage(0)
    await loadPokemonList(0)
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <p className="eyebrow">Projeto didático React + PokeAPI</p>
          <h1>Pokédex React</h1>
          <p className="hero-description">
            Projeto-base para praticar requisições, pesquisa, filtros,
            paginação e tratamento de estados assíncronos.
          </p>
        </div>
      </header>

      <main className="container content">
        <section className="controls">
          <PokemonSearch
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
          />

          <TypeFilter
            types={types || []}
            value={selectedType}
            onChange={handleTypeChange}
          />

          <button
            className="secondary-button"
            type="button"
            onClick={handleClearFilters}
          >
            Limpar
          </button>
        </section>

        <section className="results-header">
          <div>
            <h2>Pokémon</h2>

            {!loading && !error && (
              <p>
                {selectedType
                  ? `Filtro atual: ${selectedType}`
                  : search
                    ? `Pesquisa: ${search}`
                    : `${total} registros disponíveis`}
              </p>
            )}
          </div>
        </section>

        {loading && <Loading />}

        {!loading && error && (
          <div className="message error-message">
            <strong>Ops!</strong>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && pokemons.length === 0 && (
          <div className="message">
            Nenhum Pokémon encontrado.
          </div>
        )}

        {!loading && !error && pokemons.length > 0 && (
          <PokemonList pokemons={pokemons} />
        )}

        {!loading &&
          !error &&
          !selectedType &&
          !search.trim() &&
          totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrevious={() => setPage(current => current - 1)}
              onNext={() => setPage(current => current + 1)}
              onPageChange={pageNumber => setPage(pageNumber)}
            />
          )}
      </main>
    </div>
  )
}

export default App
