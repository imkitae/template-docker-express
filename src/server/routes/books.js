const express = require('express')

const asyncHandler = require('../utils/asyncHandler')


const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  const books = await req.models.Book.findAll()

  res.json(books)
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const book = await req.models.Book.findOne({
    where: { id: req.params.id },
    rejectOnEmpty: true,
  })

  res.json(book)
}))

router.post('/(:id)?', asyncHandler(async (req, res) => {
  if (req.params.id) {
    const [affected] = await req.models.Book.update(req.body, {
      where: { id: req.params.id },
    })

    if (affected === 0) {
      res.status(404).json({ message: 'Not Found' })
      return
    }

    res.sendStatus(204)
    return
  }

  const { dataValues } = await req.models.Book.create(req.body)
  res.json(dataValues)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
  const affected = await req.models.Book.destroy({
    where: { id: req.params.id },
  })

  if (affected === 0) {
    res.status(404).json({ message: 'Not Found' })
    return
  }

  res.sendStatus(204)
}))

module.exports = router
