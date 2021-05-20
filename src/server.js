const express = require('express');
var cors = require('cors');
const {routes} = require('./routes');

const app = express();

app.use(cors({
    "origin": "*",
    "allowedHeaders": ['authorization']
}));

app.use(express.json());

app.use((request, response, next) => {
    if(request.headers.authorization && request.headers.authorization === process.env.REQUEST_AUTH){
        next();
    }else{
        response.status(401).send("Não autorizado");
    }
});

app.use(routes);

app.listen(process.env.PORT || 3030, function(){
    console.log("Servidor de pé.");
});
