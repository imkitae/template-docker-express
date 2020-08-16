import React from 'react'
import { useParams } from 'react-router-dom'


const BookDetail = () => {
  const { id } = useParams()

  return <div>{`This is the book which id = ${id}`}</div>
}

export default BookDetail
