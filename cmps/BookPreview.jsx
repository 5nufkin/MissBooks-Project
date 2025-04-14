export function BookPreview({ book }) {

    const { vendor, speed } = book
    return (
        <article className="book-preview">
            <h2>Vendor: {vendor}</h2>
            <h4>Book Speed: {speed}</h4>
            <img src={`../assets/img/${vendor}.png`} alt="Book Image" />
        </article>
    )
}