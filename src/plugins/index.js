const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../package');

const swaggerOptions = {
    info: {
            title: 'API Documentation',
            version: Pack.version,
        },
};

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        },
        //  {
        //     module: 'good-file',
        //     args: ['./logs/runtime.log']
        // }
        ],
        myHTTPReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }, {
            module: 'good-http',
            args: ['http://prod.logs:3000', {
                wreck: {
                    headers: { 'x-api-key': 12345 }
                }
            }]
        }]
    }
};


const Plugins = [
    Inert, Vision,
    {plugin: require('good'), options},
    {plugin: require('./auth')},
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    },
    //{plugin: require('./mongoose', options)},
    {plugin: require('./routeV1'), 
    routes: {
        prefix: '/v1'
    },
    options
    }
];

module.exports = Plugins;