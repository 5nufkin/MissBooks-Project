const { useState } = React


export function RatingByStars({ handleChange, rating }) {

  const [hoverRating, setHoverRating] = useState(null)

  const highlight = hoverRating !== null ? hoverRating : rating
  const activeRating = hoverRating !== null ? hoverRating : rating

  function onChooseRating(value) {
    const target = { name: 'rating', value }
    handleChange({ target })
  }

  return (
    <section className="stars-rating">
      {[1, 2, 3, 4, 5].map(num =>
        <button type="button" key={num} onMouseEnter={() => setHoverRating(num)} onMouseLeave={() => setHoverRating(null)} className={`btn-rating-star ${num <= activeRating ? 'bright' : ''}`} onClick={() => onChooseRating(num)}>⭐</button>
      )}
    </section>
  )
}