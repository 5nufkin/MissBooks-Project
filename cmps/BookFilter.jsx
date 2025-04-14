import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break;

      case 'checkbox':
        value = target.checked
        break
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const bookCtgs = bookService.getBookCtgs()

  const { txt, minPrice } = filterByToEdit

  return (
    <section className="book-filter container">

      <h2>Filter Our Books</h2>

      <form onSubmit={onSubmitFilter}>
        <label htmlFor="txt">Title</label>
        <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

        <label htmlFor="minPrice">Min Price</label>
        <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number" />

        <label htmlFor="category">Category</label>
        <select onChange={handleChange} name="category" id="category">
          <option value="">Select a category</option>
          {bookCtgs.map(category => <option key={category} value={category}>{category}</option>)}
        </select>

        <button>Submit</button>
      </form>

    </section>
  )
}