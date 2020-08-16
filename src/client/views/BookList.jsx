import React, { useEffect } from 'react'

import useApi from '../hooks/useApi'
import { readBookList } from '../utils/api/books'
import BookTable from '../components/BookTable'


const BookList = () => {
  const {
    data: books,
    request: requestBooks,
  } = useApi(readBookList)

  useEffect(() => {
    requestBooks()
  }, [requestBooks])

  return <BookTable books={books} />
}

export default BookList
