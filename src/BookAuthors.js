import React from 'react';
import PropTypes from 'prop-types';

const BookAuthors = (props) => {
    const { authors } = props

    const authorsSection = authors.map((authorName,index) => (
        <div key={index} className="book-authors">{authorName}</div>
    ));

    return <div>{authorsSection}</div>
}

BookAuthors.propTypes = {
    authors: PropTypes.array.isRequired
}

export default BookAuthors;