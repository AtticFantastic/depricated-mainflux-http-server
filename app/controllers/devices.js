var mongojs = require('mongojs');

var jwt = require('jsonwebtoken');
var config = require('../../config');
var log = require('../logger');

var os = require('os');

var nats = require('nats').connect('nats://' + config.nats.host + ':' + config.nats.port);

/** createDevice() */
exports.createDevice = function(req, res, next) {

    console.log("req.headers['x-auth-token'] = ", req.headers['x-auth-token']);
    console.log("req.headers['content-type'] = ", req.headers['content-type']);
        
    /** Save the device and check for errors */
    console.log("createDevice()");

    /**
     * Request with Auto-Unsubscribe. Will unsubscribe after
     * the first response is received via {'max':1}
     */
    var msg = {};
    msg.method = 'createDevice';
    msg.body = req.body;
    
    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        /** Recieved message from NATS is string type, we need to convert it to JSON */
        res.json(JSON.parse(rsp));
        return next();
    });
}

/** getDevices() */
exports.getDevices = function(req, res, next) {

	console.log("req.headers['x-auth-token'] = ", req.headers['x-auth-token']);

    console.log("getDevices()");

    var msg = {};
    msg.method = 'getDevices';
    msg.body = req.body;

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for `getAllDevices`: ' + rsp);
        res.json(JSON.parse(rsp));
        return next();
    });
}

/** getDevice() */
exports.getDevice = function(req, res, next) {

    console.log("getDevice()");

    if (req.body === '') {
        req.body = {
            'id' : req.params.device_id
        };
    }

    console.log(req.params.device_id);
    console.log(req.body.id);

    var msg = {};
    msg.method = 'getDevice';
    msg.body = req.body;

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for getDevice: ' + rsp);
        res.json(JSON.parse(rsp));
        return next();
    });
}

/** updateDevice() */
exports.updateDevice = function(req, res, next) {
    
    console.log("updateDevice()");

    /**
     * `id` is always given by REST param.
     * Write it in JSON payload to:
     *    a) Pass the infor through the NATS
     *    b) Overwrite it if present in JSON payload - it is RO for the user,
     *       so this prevents user in passing it in the UPDATE body and changing it
     */
    req.body.id = req.params.device_id

    var msg = {};
    msg.method = 'updateDevice';
    msg.body = req.body;

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for updateDevice: ' + rsp);
        res.json(JSON.parse(rsp));
        return next();
    });
}

/** deleteDevice() */
exports.deleteDevice = function(req, res, next) {

    console.log("deleteDevice()");
    
    if (req.body === '') {
        req.body = {
            'id' : req.params.device_id
        };
    }

    var msg = {};
    msg.method = 'deleteDevice';
    msg.body = req.body;

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for deleteDevice: ' + rsp);
        res.json(JSON.parse(rsp));
        return next();
    });
}

