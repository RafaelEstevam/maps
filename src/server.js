const express = require('express');
var cors = require('cors');
const {routes} = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3030, () => {
    console.log("Servidor de pé.");
})
