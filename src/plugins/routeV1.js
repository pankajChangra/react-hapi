'use strict';

exports.plugin = {
    name : 'Routes',
    pkg: require('../../package.json'),
    register: async function (server) {
        server.route(require('../routes'));
    }
};