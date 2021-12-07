const axios = require('axios').default;
const { Router } = require('express');
const { CRYPTO_API } = require('../configs/constants');
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
		const requestUrl = `${CRYPTO_API}/${cryptoName}`;
		console.log(requestUrl);
		const response = await axios.get(requestUrl);
		res.status(200).send(cryptoName);
	} catch (err) {
		next(err);
	}
});

module.exports = router;