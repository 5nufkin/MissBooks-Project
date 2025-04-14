import { bookService } from "../services/book.service.js"
import { formatCurrency } from "../services/util.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

  const [book, setBook] = useState(null)

  useEffect(() => {
    console.log('Mounting Details')
    loadBook()
  }, [])

  function loadBook() {
    bookService.get(bookId)
      .then(book => setBook(book))
      .catch(err => console.log('err:', err))
  }

  function getReadLevelTxt() {
    const pageCount = book.pageCount
    if (pageCount >= 500) return 'Serious Reading'
    if (pageCount >= 200) return 'Descent Reading'
    return 'Light Reading'
  }

  if (!book) return <div>Loading...</div>
  const { title, listPrice, thumbnail } = book
  return (
    <section className="book-details container">

      <h1>Book Title: {title}</h1>
      <section className="tags">
        <span>{getReadLevelTxt()}</span>
      </section>
      <h1>Book Price: {formatCurrency(listPrice.amount, listPrice.currencyCode)} </h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
      <img src={`${thumbnail}`} alt="Book Image" />
      <button onClick={onBack}>Back</button>

    </section>
  )
}