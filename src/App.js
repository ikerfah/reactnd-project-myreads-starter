import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksShelf from './BooksShelf'
import * as BooksAPI from './BooksAPI'
class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => this.setState({ books }))
  }

  onShelfChanged = (book, newShelfValue) => {
    BooksAPI.update(book, newShelfValue)
      .then((_) => {
        const newBook = {
          ...book,
          shelf: newShelfValue
        }

        this.setState((prev) => ({
          books: prev.books.filter((tmp) => tmp.id !== book.id).concat([newBook])
        }))
      })
  }

  render() {

    const currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
    const read = this.state.books.filter((book) => book.shelf === 'read')
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BooksShelf title={"Currently Reading"} books={currentlyReading} onShelfChanged={this.onShelfChanged} />
                <BooksShelf title={"Want to Read"} books={wantToRead} onShelfChanged={this.onShelfChanged} />
                <BooksShelf title={"Read"} books={read} onShelfChanged={this.onShelfChanged} />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
