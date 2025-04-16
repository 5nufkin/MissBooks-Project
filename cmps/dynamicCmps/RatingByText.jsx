
export function RatingByText({ handleChange, rating }) {

  return (
    <section>
      <label htmlFor="rating">Rating:</label>
      <input type="text" name="rating" onChange={handleChange} value={rating} />
    </section>
  )
}