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
		const requestUrl = `${CRYPTO_API}/${cryptoName}`;
		const response = await axios.get(requestUrl);
		console.log(response.data);
		res.status(200).send(cryptoName);
	} catch (err) {
		next(err);
	}
});

// // GET /rates        fetch specific currency by its id
// router.route("/:id").get(async (req, res, next) => {
// 	try {
// 	  const currencyName = req.params.id;
// 	  var config = {
// 		method: "get",
// 		url: `http://api.coincap.io/v2/rates/${currencyName}`,
// 		headers: {
// 		  Authorization: "Bearer a6b66348-b17b-4935-8e99-c3d5779b6075",
// 		},
// 	  };
// 	  axios(config)
// 		.then(function (response) {
// 		  console.log(JSON.stringify(response.data.data));
// 		})
// 		.catch(function (error) {
// 		  console.log(error);
// 		});
// 	} catch (e) {
// 	  next(e);
// 	}
//   });

module.exports = router;
