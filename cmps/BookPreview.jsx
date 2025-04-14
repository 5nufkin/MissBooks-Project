import { formatCurrency } from "../services/util.service.js"
import saleImg from '../assets/img/sale.png'

export function BookPreview({ book }) {

  const { title, listPrice, thumbnail } = book

  function getSaleTag() {
    // if (listPrice.isOnSale) return <img className="sale" src="../assets/img/sale.png" alt="" />
    if (listPrice.isOnSale) return <img className="sale" src={`${saleImg}`} alt="" />
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