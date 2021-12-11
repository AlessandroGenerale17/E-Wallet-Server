const express = require('express');
const cors = require('cors');

const { PORT } = require('./config/constants');

const app = express();
const cron = require('node-cron');

const coinCapRouter = require('./routes/coinCapRoute');
const rateRouter = require('./routes/rates');

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

// this function is scheduled to run every minute...
// cron.schedule('* * * * *', () => {
//     console.log('running a task every minute');
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
