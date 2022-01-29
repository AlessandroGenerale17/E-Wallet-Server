const express = require('express');
const cors = require('cors');

const { PORT } = require('./config/constants');

const app = express();
const cron = require('node-cron');
require('dotenv').config();

const coinCapRouter = require('./routes/coinCapRoute');
const rateRouter = require('./routes/rates');
const stockRouter = require('./routes/stock');

/* MIDDLEWARES  */
app.use(cors());
app.use(express.json());

if (process.env.DELAY) {
    app.use((req, res, next) => {
        setTimeout(() => next(), parseInt(process.env.DELAY));
    });
}

app.use('/crypto', coinCapRouter);
app.use('/rate', rateRouter);
app.use('/stock', stockRouter);

// this function is scheduled to run every minute...
// cron.schedule('* * * * *', () => {
//     console.log('running a task every minute');
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
