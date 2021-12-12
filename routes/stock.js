'use strict';
const axios = require('axios').default;
const { Router } = require('express');

const router = new Router();

router.route('/:stock').get(async (req, res, next) => {
    try {
        // name of stock asset
        const stockSymbol = req.params.stock;
        // request URL using alphavantage
        const requestUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=JKT9DGK3K5FA3NH0`;
        const response = await axios.get(requestUrl);
        console.log(response.data);
        res.status(200).send(response.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
