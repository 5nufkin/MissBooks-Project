import { formatCurrency } from "../services/util.service.js"

export function BookPreview({ book }) {

  const { title, listPrice, thumbnail } = book

  return (
    <article className="book-preview">
      <h2>Title: {title}</h2>
      <h4>Book Price: {formatCurrency(listPrice.amount, listPrice.currencyCode)} </h4>
      <img src={`${thumbnail}`} alt="Book Image" />
    </article>
  )
}