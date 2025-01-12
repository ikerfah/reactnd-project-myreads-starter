import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksShelf from './BooksShelf'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    isLoading: true, // To avoid showing shelf is empty when page first loaded,
    shelves: [
      {
        title: 'Currently Reading',
        id: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        id: 'wantToRead'
      },
      {
        title: 'Read',
        id: 'read'
      },
    ]
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books, isLoading: false })
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

    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    const { books, shelves } = this.state

    const shelvesComponent = shelves.map((shelf) =>
    (<BooksShelf
      key={shelf.id}
      title={shelf.title}
      books={books.filter((book) => book.shelf === shelf.id)}
      onShelfChanged={this.onShelfChanged}
    />))

    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchBook
            books={books}
            history={history}
            onShelfChanged={this.onShelfChanged}
          />

        )} />
        <Route exact path="/" render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelvesComponent}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => history.push("/search")}>Add a book</button>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
