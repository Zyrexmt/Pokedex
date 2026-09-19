# Pokédex React - Projeto para aulas

Projeto-base desenvolvido com **React + Vite + Fetch API** usando a [PokeAPI](https://pokeapi.co/).

O objetivo é servir como projeto didático para aulas sobre:

- requisições HTTP;
- `fetch`;
- `async/await`;
- `useState`;
- `useEffect`;
- loading;
- tratamento de erros;
- pesquisa;
- filtros;
- paginação;
- `Promise.all`;
- componentização;
- services.

---

## Instalação

Entre na pasta do projeto:

```bash
cd pokedex-react-aulas
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local, normalmente:

```text
http://localhost:5173
```

---

## Recursos disponíveis

### Listagem de Pokémon

Utiliza:

```text
https://pokeapi.co/api/v2/pokemon
```

### Pesquisa por nome

Exemplo:

```text
https://pokeapi.co/api/v2/pokemon/pikachu
```

### Tipos

Utiliza:

```text
https://pokeapi.co/api/v2/type
```

### Filtro por tipo

Exemplo:

```text
https://pokeapi.co/api/v2/type/fire
```

---

## Sugestão de sequência das aulas

1. Requisição simples com `fetch`.
2. Conversão da resposta com `response.json()`.
3. `useState` e `useEffect`.
4. Listagem com `.map()`.
5. Componentização com `PokemonCard`.
6. Busca por nome.
7. Filtros.
8. Loading e erros.
9. `Promise.all`.
10. Paginação.
11. Organização das requisições em `services`.
12. Evolução do projeto.

---

## Estrutura

```text
src/
├── components/
│   ├── Loading.jsx
│   ├── Pagination.jsx
│   ├── PokemonCard.jsx
│   ├── PokemonList.jsx
│   ├── PokemonSearch.jsx
│   └── TypeFilter.jsx
├── services/
│   └── pokemonService.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## Observação didática

O projeto já vem com vários recursos prontos.

Para as aulas, uma boa estratégia é iniciar removendo funcionalidades e reconstruí-las junto com os alunos.

Por exemplo:

- começar apenas buscando o Pikachu;
- depois listar 20 Pokémon;
- depois adicionar cards;
- posteriormente implementar pesquisa;
- depois filtros;
- por último paginação e tratamento de erros.
