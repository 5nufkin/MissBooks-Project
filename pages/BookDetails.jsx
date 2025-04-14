import { LongTxt } from "../cmps/LongTxt.jsx"
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

  function getReadLevelTag() {
    const pageCount = book.pageCount
    if (pageCount >= 500) return 'Serious Reading'
    if (pageCount >= 200) return 'Descent Reading'
    return 'Light Reading'
  }

  function getBookAgeTag() {
    const publishYear = book.publishedDate
    const presentYear = new Date().getFullYear()
    if (presentYear - publishYear > 10) return 'Vintage'
    if (presentYear - publishYear <= 1) return 'New'
    return null
  }

  function getPriceColorClass() {
    const price = book.listPrice.amount
    if (price > 150) return 'red'
    if (price < 20) return 'green'
    return ''
  }

  function getSaleSticker() {
    if (book.listPrice.isOnSale) return <img className="sale-sticker" src="../assets/img/saleSticker.png" alt="" />
    return null
  }

  if (!book) return <div>Loading...</div>
  const { title, listPrice, thumbnail } = book
  return (
    <section className="book-details container">

      <h1>Book Title: {title}</h1>
      <section className="tags">
        <span>{getReadLevelTag()}</span>
        <span>{getBookAgeTag()}</span>

      </section>
      <h1>Book Price: <span className={`price ${getPriceColorClass()}`}>{formatCurrency(listPrice.amount, listPrice.currencyCode)} </span></h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
      <LongTxt txt={book.description} length={10} />
      <div className="img-container">
        <img src={`${thumbnail}`} alt="Book Image" />
        {getSaleSticker()}
      </div>
      <button onClick={onBack}>Back</button>

    </section>
  )
}