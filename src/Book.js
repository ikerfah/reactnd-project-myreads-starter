import React from 'react';
import PropTypes from 'prop-types';
import BookAuthors from './BookAuthors';
import BookShelfChanger from './BookShelfChanger';
const Book = (props) => {

    const handleOnShelfChanged = (newShelfValue) => {
        if (props.onShelfChanged) {
            props.onShelfChanged(props.book, newShelfValue)
        }
    }
    const { book } = props
    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: (book.imageLinks && book.imageLinks.thumbnail) ? `url("${book.imageLinks.thumbnail}")` : 'none' }}></div>
                    <BookShelfChanger onShelfChanged={handleOnShelfChanged} defaultShelf={book.shelf} />
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && <BookAuthors authors={book.authors} />}
            </div>
        </li>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChanged: PropTypes.func.isRequired
};

export default Book;