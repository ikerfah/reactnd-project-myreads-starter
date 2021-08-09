import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
class SearchBook extends Component {
    state = {
        query: '',
        searchedBooks: []

    }

    handleOnChangeQuery = (value) => {
        this.setState((_) => ({
            query: value
        }))

        if (value !== '') {

            BooksAPI.search(value)
                .then((books) => {
                    this.setState((_) => ({
                        searchedBooks: [...books]
                    }))
                })
        }

    }
    render() {
        const { searchedBooks } = this.state

        const booksComponents = searchedBooks.map((book) => (
            <Book book={book} onShelfChanged={this.onShelfChanged} />
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
                    <ol className="books-grid">
                        {booksComponents}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBook;