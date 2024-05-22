require ('dotenv').config();
const Hapi = require("@hapi/hapi");
const routes = require('./routes');
const loadModel = require('../services/loadModel');

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes:{
            cors:{
                origin: ["*"],
            },
        },
    });
    await server.start();
    console.log(`server run : ${server.info.uri}`);

    server.route(routes);

    server.ext('onPreResponse',function (request,h) {
        const response = request.response;

        if (response instanceof InputError){
            const newResponse = h.response({
                status: "fail",
                message : "Payload content length greater than maximum allowed: 1000000"
            });
            newResponse.code({
                statusCode: 413
            })
            return newResponse
        }

        if (response instanceof isBoom){
            const newResponse = h.response({
                status: "fail",
                message : "Terjadi kesalahan dalam melakukan prediksi"
            });
            newResponse.code({
                statusCode: 400
            })
            return newResponse
        }
        
        return h.continue();
    });


    const model = loadModel();
    server.app.model = model;

})();

