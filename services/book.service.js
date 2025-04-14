import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CAR_KEY = 'bookDB'
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
    return storageService.query(CAR_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.vendor))
            }
            if (filterBy.minSpeed) {
                books = books.filter(book => book.speed >= filterBy.minSpeed)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(CAR_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(CAR_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(CAR_KEY, book)
    } else {
        return storageService.post(CAR_KEY, book)
    }
}

function getEmptyBook(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}

function _createBooks() {
    let books = loadFromStorage(CAR_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('audu', 300),
            _createBook('fiak', 120),
            _createBook('subali', 50),
            _createBook('mitsu', 150)
        ]
        saveToStorage(CAR_KEY, books)
    }
}

function _createBook(vendor, speed = 250) {
    const book = getEmptyBook(vendor, speed)
    book.id = makeId()
    return book
}