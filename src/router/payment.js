const { Router } = require("express");
const mercadopago = require("../services/mercadoPago");
require('dotenv').config()
//const { URL_BASE_LOCAL } = process.env;
const { URL_BASE_BACK } = process.env;
const { URL_BASE_FRONT } = process.env;

const router = Router();

router.post("/create-order", (req, res) => {
    let preference = {
        items: [
            {
                id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                unit_price: Number(req.body.price),
                currency_id: 'ARS',
                quantity: Number(req.body.quantity),
            }
        ],
        payer: {
            name: 'Lalo',
            surname: 'Landa',
            email: 'test_user_36961754@testuser.com',
            phone: {
                area_code: '0353',
                number: 154115273
            },
            address: {
                street_name: 'calle falsa',
                street_number: 123,
                zip_code: '5900'
            }
        },
        back_urls: {
            "success": `${URL_BASE_FRONT}payment/feedback`,
            "failure": `${URL_BASE_FRONT}payment/feedback`,
            "pending": `${URL_BASE_FRONT}payment/feedback`
        },
        notification_url: `${URL_BASE_BACK}payment/webhook`,
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
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(400).json({ error: error.message }));
})

router.get("/feedback", (req, res) => {
    console.log({
        PaymentId: req.query.payment_id,
        Method: req.query.payment_type,
        ExternalReference: req.query.external_reference,
        MerchantOrder: req.query.merchant_order_id,
        Status: req.query.status,
    });
    res.status(200).redirect("https://checkpro-mp-front-3vvz.vercel.app/")
})

router.post("/webhook", (req, res) => {
    console.log(req.query)
    res.status(201).json({ message: "procesando pago..." });
})


module.exports = router;
