import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function AddReview({ bookId, onAddReview }) {
  const [review, setReview] = useState(bookService.getEmptyReview())


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

  const {fullName, rating, readAt} = review

  return (
    <section className="add-review">

      <h2>Add a review</h2>

      <form onSubmit={onSubmitReview} className="review-form">
        <label htmlFor="fullName">Full name:</label>
        <input type="text" onChange={handleChange} value={fullName} name="fullName" id="fullName" />

        <label htmlFor="rating">Rating:</label>
        <select onChange={handleChange} value={rating} name="rating" id="rating">
          <option value="">Select rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="readAt">Read at: </label>
        <input type="date" onChange={handleChange} value={readAt} id="readAt" name="readAt" />

        <button>Submit</button>
      </form>

    </section>
  )
}