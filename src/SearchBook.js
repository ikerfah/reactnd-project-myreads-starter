import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import debounce from 'lodash.debounce';
class SearchBook extends Component {
    state = {
        query: '',
        searchedBooks: [],
        error: ''

    }

    debouncedEventHandler = debounce((query) => this.fetchBooks(query), 300);

    fetchBooks = (query) => {
        // This to be sure no api call after removing all the query
        if (query === '') {
            this.setState((_) => ({
                query: '',
                searchedBooks: []
            }))
            return;
        }

        BooksAPI.search(query)
            .then((books) => {
                if (books.error) {
                    this.setState({
                        error: books.error,
                        searchedBooks: [...books.items]
                    })
                } else {
                    this.setState((_) => ({
                        error: '',
                        searchedBooks: [...books]
                    }))
                }
            })
    }
    handleOnChangeQuery = (value) => {
        this.setState((_) => ({
            query: value,
            searchedBooks: []
        }))
        this.debouncedEventHandler(value)


    }
    onShelfChanged = (book, newShelfValue) => {
        if (this.props.onShelfChanged) {
            this.props.onShelfChanged(book, newShelfValue)
        }
    }

    render() {
        const { searchedBooks } = this.state

        const { books } = this.props

        const mergedBooks = searchedBooks.map((searchedBook) => ({
            ...searchedBook, ...books.find((book) => book.id === searchedBook.id)
        }))
        const booksComponents = mergedBooks.map((book) => (
            <Book key={book.id} book={book} onShelfChanged={this.onShelfChanged} />
        ))
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.props.history.push("/")}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            value={this.state.query}
                            placeholder="Search by title or author"
                            onChange={(event) => this.handleOnChangeQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
                    <ol className="books-grid">
                        {booksComponents}
                    </ol>
                </div>
            </div>
        );
    }
}

SearchBook.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default SearchBook;