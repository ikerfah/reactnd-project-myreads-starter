import React from 'react'
import PropTypes from 'prop-types'
const BookShelfChanger = (props) => {
    const handleOnChange = (value)=>{
        if(props.onShelfChanged){
            props.onShelfChanged(value)
        }
    }

    const {defaultShelf} = props

    return (
        <div className="book-shelf-changer">
            <select onChange={(event)=> handleOnChange(event.target.value)} defaultValue={defaultShelf?defaultShelf:'none'}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

BookShelfChanger.propTypes = {
    onChelfChanged: PropTypes.func.isRequired
}
export default BookShelfChanger;