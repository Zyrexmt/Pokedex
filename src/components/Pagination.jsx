function Pagination({ page, totalPages, onPrevious, onNext, onPageChange}) {

  const pages = Array.from(
    { length: totalPages},
    // funcao anonima
    (_, index) => index 
  )

  return (
    <nav className="pagination" aria-label="Paginação">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 0}
      >
        Anterior
      </button>

      {/* <span>
        Página {page + 1} de {totalPages}
      </span> */}

      <div className="pagination-pages">
        {
          pages.map(pageNumber => [
            <button
            type="button"
            key={pageNumber}
            className={page === pageNumber ? 'active' : ''}
            onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber +1} 
            </button>
          ])
        }

      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={page + 1 >= totalPages}
      >
        Próxima
      </button>
    </nav>
  )
}

export default Pagination
