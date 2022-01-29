'use strict';
const axios = require('axios').default;
const { Router } = require('express');
const { API_KEY } = require('../config/constants');
const { STOCK_API } = require('../config/constants');

const router = new Router();

// FIXME if field is left blank above, then secound route gets hit
router.route('/suggestions/:searchTerm').get(async (req, res, next) => {
    try {
        const searchTerm = req.params.searchTerm.trim();
        console.log('search term ', searchTerm);
        if (!searchTerm.length)
            return res.status(400).send({
                error: 'Invalid search term',
                description: 'The field cannot be empty'
            });
        const response = await axios.get(
            `${STOCK_API}/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${API_KEY}`
        );
        if (!response.data.bestMatches.length)
            return res.status(400).send({
                error: 'Invalid search term',
                description: `Cannot find corresponding stocks with the provided: ${searchTerm}`
            });
        return res.status(200).send(response.data.bestMatches);
    } catch (err) {
        next(err);
    }
});

router.route('/:stock').get(async (req, res, next) => {
    try {
        // name of stock asset
        const stockSymbol = req.params.stock;
        // request URL using alphavantage
        const requestUrl = `${STOCK_API}/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${API_KEY}`;
        const response = await axios.get(requestUrl);
        console.log(response.data);
        res.status(200).send(response.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
