import React from 'react'
import PropTypes from 'prop-types'


const BookTable = (props) => {
  const { books } = props

  return (
    <table style={{ border: '1px solid' }}>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>author</th>
        </tr>
      </thead>
      <tbody>
        { books !== undefined
          ? books.map((book) => (
            <tr>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))
          : null }
      </tbody>
    </table>
  )
}

BookTable.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    title: PropTypes.string.required,
    author: PropTypes.string,
  })),
}

BookTable.defaultProps = {
  books: [],
}

export default BookTable
