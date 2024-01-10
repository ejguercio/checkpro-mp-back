const { Router } = require("express");
const mercadopago = require("../services/mercadoPago");
require('dotenv').config()
//const { URL_BASE_LOCAL } = process.env;
const { URL_BASE_MAIN } = process.env;

const router = Router();

router.post("/create-order", (req, res) => {
    let preference = {
        items: [
            {
                id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        // payer: {
        //     name: 'João',
        //     surname: 'Silva',
        //     email: 'user@email.com',
        //     phone: {
        //       area_code: '11',
        //       number: '4444-4444'
        //     },
        //     identification: {
        //       type: 'CPF',
        //       number: '19119119100'
        //     },
        //     address: {
        //       street_name: 'Street',
        //       street_number: 123,
        //       zip_code: '06233200'
        //     }
        //   },
        back_urls: {
            "success": `${URL_BASE_MAIN}payment/feedback`,
            "failure": `${URL_BASE_MAIN}payment/feedback`,
            "pending": `${URL_BASE_MAIN}payment/feedback`
        },
        notification_url: `${URL_BASE_MAIN}payment/webhook`,
        auto_return: "approved",
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "visa" //Excluye pago con tarjeta credito Visa
                }
            ],
            excluded_payment_types: [],
            installments: 6, // Permite hasta 6 cuotas
        },
        external_reference: "jguercio@live.com.ar",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.status(200).json({ response });
        })
        .catch(function (error) { console.log(error) });
})

router.get("/feedback", (req, res) => {
    res.status(200).json({
        PaymentId: req.query.payment_id,
        Method: req.query.payment_type,
        ExternalReference: req.query.external_reference,
        MerchantOrder: req.query.merchant_order_id,
        Status: req.query.status,
    });
})

router.post("/webhook", (req, res) => {
    console.log(req.query)
    res.status(201).json({ message: "done" });
})


module.exports = router;
