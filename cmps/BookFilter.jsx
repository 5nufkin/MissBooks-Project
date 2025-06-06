const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy, categories }) {

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

  const { txt, minPrice, publishedSince } = filterByToEdit

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
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>

        <label htmlFor="onSale">
          <input onChange={handleChange} type="checkbox" name="onSale" id="onSale" />
          On Sale
        </label>

        <label htmlFor="publishedSince">Published after: {publishedSince}
          <input onChange={handleChange} type="range" id="publishedSince" name="publishedSince" value={publishedSince} min="1950" max={new Date().getFullYear()} />
        </label>

        <button>Submit</button>
      </form>

    </section>
  )
}