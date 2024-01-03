const { Router } = require('express')
const router = Router()
const products = require("../utils/products.json")

router.get('/', (req, res) => {
    try {
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
