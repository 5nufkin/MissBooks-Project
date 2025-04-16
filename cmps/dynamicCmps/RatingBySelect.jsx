
export function RatingBySelect({ handleChange, rating }) {

  return (
    <section>
      <label htmlFor="rating">Rating:</label>
      <select onChange={handleChange} value={rating} name="rating" id="rating">
        <option value="">Select rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </section>
  )
}