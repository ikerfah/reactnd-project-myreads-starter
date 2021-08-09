import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
const BooksShelf = (props) => {
    const onShelfChanged = (book, newShelfValue) => {
        if (props.onShelfChanged) {
            props.onShelfChanged(book, newShelfValue)
        }
    }
    const { title, books } = props

    const booksComponents = books.map((book) => (
        <Book key={book.id} book={book} onShelfChanged={onShelfChanged} />
    ))

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                {(!books || books.length === 0) ?
                    <span>Shelf is empty</span> :
                    <ol className="books-grid">
                        {booksComponents}
                    </ol>}
            </div>
        </div>
    )
}

BooksShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired
};

export default BooksShelf;