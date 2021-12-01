const express = require('express');
const cors = require('cors');

const { PORT } = require('./configs/constants');

const app = express();

/* MIDDLEWARES  */
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
