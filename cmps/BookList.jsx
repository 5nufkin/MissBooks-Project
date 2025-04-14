import { BookPreview } from "./BookPreview.jsx";

export function BookList({ loadingClass, books, onRemoveBook, onSelectBookId }) {

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
                        <button onClick={() => onSelectBookId(book.id)}>
                            Details
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )

}