import axios from 'axios'


const readBookList = () => (
  axios({
    url: '/api/books',
    method: 'GET',
  })
)

const readBook = (id) => (
  axios({
    url: `/api/books/${id}`,
    method: 'GET',
  })
)

const createBook = async (data) => (
  axios({
    url: '/api/books',
    method: 'POST',
    data,
  })
)

const updateBook = async (data) => {
  const { id, ...remains } = data

  return axios({
    url: `/api/books/${id}`,
    method: 'POST',
    data: { ...remains },
  })
}

const deleteBook = (id) => (
  axios({
    url: `/api/books/${id}`,
    method: 'DELETE',
  })
)

export {
  readBookList,
  readBook,
  createBook,
  updateBook,
  deleteBook,
}
