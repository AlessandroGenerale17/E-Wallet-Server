const axios = require('axios').default;
const { Router } = require('express');
const { CRYPTO_API } = require('../config/constants');
const router = new Router();

router.route('/:currency').get(async (req, res, next) => {
    try {
        const currency = req.params.currency;
        const response = await axios.get(`${CRYPTO_API}/rates/${currency}`);
        console.log(response.data);
        res.status(200).send(response.data);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
