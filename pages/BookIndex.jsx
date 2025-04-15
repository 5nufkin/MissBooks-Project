const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {

  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  // console.log('filterBy:', filterBy)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy)
      .then(books => setBooks(books))
      .catch(err => console.log('err:', err))
  }

  function onRemoveBook(bookId) {
    setIsLoading(true)
    bookService.remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
        showSuccessMsg('Book removed successfully')
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Error! Could not remove book.')
      })
      .finally(() => setIsLoading(false))
  }

  function onSetFilterBy(filterByToEdit) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
  }


  const loadingClass = isLoading ? 'loading' : ''

  return (
    <section className="book-index">

      {(
        books
          ? <React.Fragment>
            <BookFilter
              onSetFilterBy={onSetFilterBy}
              filterBy={filterBy}
              categories={bookService.getBookCtgs()}
            />
            <Link to="/book/edit">Add Book</Link>
            <BookList
              loadingClass={loadingClass}
              books={books}
              onRemoveBook={onRemoveBook}
            />
          </React.Fragment>
          : <div>Loading...</div>
      )}
    </section>
  )
}