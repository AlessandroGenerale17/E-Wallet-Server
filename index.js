const express = require('express');
const cors = require('cors');

const { PORT } = require('./configs/constants');

const app = express();
const cron = require('node-cron');

const coinCapRouter = require('./routes/coinCapRoute');

/* MIDDLEWARES  */
app.use(cors());
app.use(express.json());

app.use('/crypto', coinCapRouter);


// this function is scheduled to run every minute...
cron.schedule('* * * * *', () => {
	console.log('running a task every minute');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
