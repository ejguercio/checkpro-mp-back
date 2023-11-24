const { Router } = require("express");
const mercadopago = require("../services/mercadoPago");

const router = Router();

router.post("/create-order", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            "success": "http://localhost:8080/feedback",
            "failure": "http://localhost:8080/feedback",
            "pending": "http://localhost:8080/feedback"
        },
        auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.status(200).json({ response });
        })
        .catch(function (error) { console.log(error) });
})

router.get("/feedback", (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
})


module.exports = router;
