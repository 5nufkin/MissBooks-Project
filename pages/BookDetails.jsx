import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"
import { formatCurrency } from "../services/util.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    setIsLoading(true)
    bookService.get(params.bookId)
      .then(book => setBook(book))
      .catch(err => console.log('err:', err))
      .finally(() => setIsLoading(false))
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
    if (book.listPrice.isOnSale) return <img className="sale-sticker" src="assets/img/saleSticker.png" alt="" />
    return null
  }

  function onBack() {
    navigate('/book')
  }

  function onEdit() {
    navigate(`/book/edit/${book.id}`)
  }

  if (isLoading) return <div>Loading...</div>

  const { title, listPrice, thumbnail } = book

  return (
    <section className="book-details container">

      <h1>Book Title: {title}</h1>
      <section className="tags">
        <span>{getReadLevelTag()}</span>
        <span>{getBookAgeTag()}</span>

      </section>
      <h1>Book Price: <span className={`price ${getPriceColorClass()}`}>{formatCurrency(listPrice.amount, listPrice.currencyCode)} </span></h1>
      <LongTxt txt={book.description} />
      <div className="img-container">
        <img src={`${thumbnail}`} alt="Book Image" />
        {getSaleSticker()}
      </div>
      <section className="buttons-container">
        <button onClick={onBack}>Back</button>
        <button onClick={onEdit}>Edit</button>
        <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
        <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
      </section>

    </section>
  )
}