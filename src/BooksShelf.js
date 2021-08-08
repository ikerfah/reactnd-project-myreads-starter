import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
class BooksShelf extends Component {
    render() {
        const { title,books} = this.props

        const booksComponents = books.map((book) =>(
            <Book book={book} />
        ))
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksComponents}
                    </ol>
                </div>
            </div>
        )
    }
}

BooksShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
};

export default BooksShelf;