const { Router } = require('express')
const router = Router()
const books = require("../utils/books.json")

router.get('/', (req, res) => {
    try {
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
