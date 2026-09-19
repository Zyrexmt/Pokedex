function TypeFilter({ types, value, onChange }) {
  return (
    <div className="type-filter">
      <select
        value={value}
        aria-label="Filtrar por tipo"
        onChange={event => onChange(event.target.value)}
      >
        <option value="">Todos os tipos</option>

        {types.map(type => (
          <option
            value={type.name}
            key={type.name}
          >
            {type.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TypeFilter
