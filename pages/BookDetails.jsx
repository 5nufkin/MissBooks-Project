import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)
    useEffect(() => {
        console.log('Mounting Details')
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log('err:', err))
    }
    
    if (!book) return <div>Loading...</div>
    const { title, price } = book
    return (
        <section className="book-details container">
            <h1>Book Title: {title}</h1>
            <h1>Book Price: {price}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <img src={`../assets/img/${title}.jpg`} alt="Book Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}