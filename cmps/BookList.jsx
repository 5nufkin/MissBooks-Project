const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx";

export function BookList({ loadingClass, books, onRemoveBook }) {
  if (!books.length) return <div>No Books To Show...</div>
  return (
    <ul className="book-list container">
      {books.map(book => (
        <li className={loadingClass} key={book.id}>
          <BookPreview book={book} />
          <section>
            <button onClick={() => onRemoveBook(book.id)}>
              Remove
            </button>
            <Link to={`/book/${book.id}`}>
              <button>Details</button>
            </Link>
          </section>
        </li>
      ))}
    </ul>
  )

}