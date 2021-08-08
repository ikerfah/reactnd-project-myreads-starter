import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookAuthors from './BookAuthors';
import BookShelfChanger from './BookShelfChanger';
class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleOnShelfChanged = (newShelfValue) =>{
        if(this.props.onShelfChanged){
            this.props.onShelfChanged(this.props.book,newShelfValue)
        }
    }
    render() {
        const {book} = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                        <BookShelfChanger onShelfChanged={this.handleOnShelfChanged}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <BookAuthors authors={book.authors}/>
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChanged: PropTypes.func.isRequired
};

export default Book;