import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit() {

  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const [isEdit, setIsEdit] = useState(true)
  const params = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if (params.bookId) {
      loadBook()
    }
  }, [])


  function loadBook() {
    bookService.get(params.bookId)
      .then(setBookToEdit)
      .catch(err => console.log('err', err))
  }

  if (!bookToEdit) return <div>Loading...</div>

  function handleChange({ target }) {
    let { value, name: field, type } = target
    switch (type) {
      case 'number':
      case 'range':
        value = +value
        break;

      case 'checkbox':
        value = target.checked
        break
    }
    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
  }

  function handleListPriceChange({ target }) {

    let { value, name: field, type } = target
    switch (type) {
      case 'number':
      case 'range':
        value = +value
        break;

      case 'checkbox':
        value = target.checked
        break
    }
    setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, [field]: value } }))
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit)
      .then((book) => console.log(book))
      .catch(err => console.log('err', err))
      .finally(() => navigate('/book'))
  }



  return (
    <section className='book-edit'>
      <h2 className='edit-book-header'>Edit Book</h2>
      <form onSubmit={onSaveBook}>
        <div className='book-details-info-row'>
          <label className='book-details-info-title'>Title:</label>
          <input
            type='text'
            placeholder='Enter New Title'
            name='title'
            value={bookToEdit.title}
            onChange={handleChange}
          />
        </div>

        <div className='book-details-info-row'>
          <label className='book-details-info-title'>Price:</label>
          <input
            type='number'
            placeholder='Set Price'
            name='amount'
            onChange={handleListPriceChange}
            value={bookToEdit.listPrice.amount}
          />
        </div>

        <div className='book-edit-actions-container'>
          <button className='save-edit-btn' >
            Save ✔
          </button>
          <button
            type='button'
            className='cancel-edit-btn'
            onClick={() => setIsEdit(false)}
          >
            Cancel ✖
          </button>
        </div>

      </form>
    </section >
  )
}


// const { useState } = React


// export function BookEdit({ book, onUpdate, onCancelEdit }) {

//   const [bookToEdit, setBookToEdit] = useState({ ...book })

//   function handleChange({ target }) {
//     let { value, name: field, type } = target
//     switch (type) {
//       case 'number':
//       case 'range':
//         value = +value
//         break;

//       case 'checkbox':
//         value = target.checked
//         break
//     }
//     setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
//   }

//   function handleListPriceChange({ target }) {

//     let { value, name: field, type } = target
//     switch (type) {
//       case 'number':
//       case 'range':
//         value = +value
//         break;

//       case 'checkbox':
//         value = target.checked
//         break
//     }
//     setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...book.listPrice, [field]: value } }))
//   }

//   function onSaveBook(ev) {
//     ev.preventDefault()
//     onUpdate(bookToEdit)
//   }



//   return (
//     <section className='book-edit'>
//       <h2 className='edit-book-header'>Edit Book</h2>
//       <form onSubmit={onSaveBook}>
//         <div className='book-details-info-row'>
//           <label className='book-details-info-title'>Title:</label>
//           <input
//             type='text'
//             placeholder='Enter New Title'
//             name='title'
//             value={bookToEdit.title}
//             onChange={handleChange}
//           />
//         </div>

//         <div className='book-details-info-row'>
//           <label className='book-details-info-title'>Price:</label>
//           <input
//             type='number'
//             placeholder='Set Price'
//             name='amount'
//             onChange={handleListPriceChange}
//             value={bookToEdit.listPrice.amount}
//           />
//         </div>

//         <div className='book-edit-actions-container'>
//           <button className='save-edit-btn' >
//             Save ✔
//           </button>
//           <button
//             type='button'
//             className='cancel-edit-btn'
//             onClick={onCancelEdit}
//           >
//             Cancel ✖
//           </button>
//         </div>

//       </form>
//     </section>
//   )
// }
