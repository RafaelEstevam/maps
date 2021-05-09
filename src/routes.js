const {Router} = require('express');
const {Maps} = require('./maps');

const routes = Router();
const maps = new Maps();

routes.get('/', async (request, response) => {
    return response.send("Say hello to my little friend!!!");
})

routes.post('/transit-routes', async (request, response) => {
    
    const {origin, destination} = request.body;
    return response.json(await maps.getAddress(origin, destination));

})

module.exports = {routes};

