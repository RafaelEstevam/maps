const {Client} = require("@googlemaps/google-maps-services-js")
const client = new Client();
const key = process.env.GOOGLE_MAPS_API_KEY;

class Maps {

    async removeData(directions){

        console.log(directions);

        const transport_lines = directions?.steps?.map((item) => {
            let step = {};
            step.transit_details = {};
            step.distance = item.distance;
            if(item.transit_details){
                step.transit_details.headsign = item.transit_details.headsign;
                step.transit_details.line = item.transit_details.line;
                step.transit_details.num_stops = item.transit_details.num_stops;
            }
            step.travel_mode = item.travel_mode;
            return step;
        }).filter((item) => {
            return item.travel_mode === 'TRANSIT'
        });
        return {
            transport_lines,
            transport_tickets: transport_lines.length > 0 ? true : false,
            transport_number : transport_lines.length,
            arrival_time: directions.arrival_time,
            distance: directions.distance,
            duration: directions.duration
        }
    }

    async getAddress(origin, destination){

        const data = await new Date().setHours(11,0,0,0); // Considera sempre 8 horas da manhã para fazer a consulta

        // console.log(new Date(data));

        const directions = await client.directions({
            params: {
                key: key,
                origin: origin,
                destination: destination,
                mode: "transit",
                language: "pt",
                arrival_time: data / 1000
            }
        })
        .then((response) => {
            return this.removeData(response.data.routes[0].legs[0]);
        })
        .catch((err) => {
            this.response = err.response.data.error_message;
        });
        return directions;
    }
    
}

module.exports = {Maps};