const axios = require('axios').default;
const { Router } = require('express');
const { CRYPTO_API } = require('../config/constants');
const router = new Router();

router.route('/').get(async (req, res, next) => {
    try {
        // for now sanity check
        res.status(200).send('OK');
    } catch (err) {
        next(err);
    }
});

router.route('/:crypto').get(async (req, res, next) => {
    try {
        // name of crypto asset
        const cryptoName = req.params.crypto;
        // request URL using coinCapApi
        const requestUrl = `${CRYPTO_API}/assets/${cryptoName}`;
        const response = await axios.get(requestUrl);
        res.status(200).send(response.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
