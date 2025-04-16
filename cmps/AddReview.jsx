import { bookService } from "../services/book.service.js"
import { DynamicCmp } from "./DynamicCMp.jsx"

const { useState, useEffect } = React

export function AddReview({ bookId, onAddReview }) {
  const [review, setReview] = useState(bookService.getEmptyReview())

  const [cmpType, setCmpType] = useState('select')
  const [ratingMethod, setRatingMethod] = useState({})

  function onSubmitReview(ev) {
    ev.preventDefault()
    onAddReview(review)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    if (target.name === 'rating') value = +value

    setReview(prevReview => ({ ...prevReview, [field]: value }))
  }

  const { fullName, rating, readAt } = review

  return (
    <section className="add-review">

      <h2>Add a review</h2>

      <form onSubmit={onSubmitReview} className="review-form">
        <label htmlFor="fullName">Full name:</label>
        <input type="text" onChange={handleChange} value={fullName} name="fullName" id="fullName" />

     

        <section>
          <legend>Choose rating method:</legend>

          <label htmlFor="rating-method">Select</label>
          <input checked={cmpType === 'select'} type="radio" name="rating-method" value="select" onChange={(ev) => setCmpType(ev.target.value)} />

          <label htmlFor="rating-method">Text</label>
          <input checked={cmpType === 'text'} type="radio" name="rating-method" value="text" onChange={(ev) => setCmpType(ev.target.value)} />

          <label htmlFor="rating-method">Stars</label>
          <input checked={cmpType === 'stars'} type="radio" name="rating-method" value="stars" onChange={(ev) => setCmpType(ev.target.value)} />

        </section>

        <DynamicCmp
          {...ratingMethod}
          handleChange={handleChange}
          cmpType={cmpType}
          rating={review.rating}
        />

        <label htmlFor="readAt">Read at: </label>
        <input type="date" onChange={handleChange} value={readAt} id="readAt" name="readAt" />

        <button>Submit</button>
      </form>

    </section>
  )
}