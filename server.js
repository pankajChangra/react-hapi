'use strict';

var Hapi = require('@hapi/hapi');
var Rotuing = require('./src/routes/Users');


const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    await server.route(Rotuing);   

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();