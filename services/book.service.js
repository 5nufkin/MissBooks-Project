import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY)
    .then(books => {
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        books = books.filter(book => regExp.test(book.title))
      }
      if (filterBy.minPrice) {
        books = books.filter(book => book.price >= filterBy.minPrice)
    }
      return books
    })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = '', price = '') {
  return { title, price }
}

function getDefaultFilter() {
  return { txt: '', minPrice: '' }
}

function _createBooks() {
  let books = loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = [
      _createBook('The Bible', 120),
      _createBook('The Alchemist', 50),
      _createBook('Narnia', 150)
    ]
    saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, price = 250) {
  const book = getEmptyBook(title, price)
  book.id = makeId()
  return book
}