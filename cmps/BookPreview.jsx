import { formatCurrency } from "../services/util.service.js"

export function BookPreview({ book }) {

  const { title, listPrice, thumbnail, localThumbnail } = book

  function getSaleTag() {
    // if (listPrice.isOnSale) return <img className="sale" src="../assets/img/sale.png" alt="" />
    if (listPrice.isOnSale) return <img className="sale" src="assets/img/sale.png" alt="" />
    return null
  }

  return (
    <article className="book-preview">
      {getSaleTag()}
      <h2>Title: {title}</h2>
      <h4>Book Price: {formatCurrency(listPrice.amount, listPrice.currencyCode)} </h4>
      <img src={`${thumbnail}`} alt="Book Image" />
    </article>
  )
}