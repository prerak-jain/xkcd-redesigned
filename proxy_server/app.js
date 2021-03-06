const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(
    cors({
        origin: '*',
    })
);

app.use('/', routes);

app.listen(process.env.PORT || 3001);
