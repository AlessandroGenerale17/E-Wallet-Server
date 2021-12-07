const express = require('express');
const cors = require('cors');

const { PORT } = require('./configs/constants');

const app = express();

const coinCapRouter = require('./routes/coinCapRoute');

/* MIDDLEWARES  */
app.use(cors());
app.use(express.json());

app.use('/crypto', coinCapRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
