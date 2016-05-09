var mongojs = require('mongojs');

var jwt = require('jsonwebtoken');
var config = require('../../config');
var log = require('../logger');

var os = require('os');

var nats = require('nats').connect();

/** createDevice() */
exports.createDevice = function(req, res, next) {

    console.log("req.headers['x-auth-token'] = ", req.headers['x-auth-token']);
    console.log("req.headers['content-type'] = ", req.headers['content-type']);
        
    /** Save the device and check for errors */
    console.log("createDevice()");

    // Request with Auto-Unsubscribe. Will unsubscribe after
    // the first response is received via {'max':1}
    var msg = {};
    msg.method = 'createDevice';
    //msg.params = [deviceName];

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for `createDevice`: ' + rsp);

        res.send(rsp);
        return next();
    });
}

/** getDevices() */
exports.getDevices = function(req, res, next) {

	console.log("req.headers['x-auth-token'] = ", req.headers['x-auth-token']);

    console.log("getDevices()");

    var msg = {};
    msg.method = 'getDevices';

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for `getAllDevices`: ' + rsp);

        res.send(rsp);
        return next();
    });
}

/** getDevice() */
exports.getDevice = function(req, res, next) {

    console.log("getDevice()");

    var msg = {};
    msg.method = 'getDevice';
    //msg.params = [deviceId];

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for getDevice: ' + rsp);

        res.send(rsp);
        return next();
    });
}

/** updateDevice() */
exports.updateDevice = function(req, res, next) {
    
    console.log("updateDevice()");

    var msg = {};
    msg.method = 'updateDevice';
    //msg.params = [deviceId, attribute, value];

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for updateDevice: ' + rsp);

        res.send(rsp);
        return next();
    });
}

/** deleteDevice() */
exports.deleteDevice = function(req, res, next) {

    console.log("deleteDevice()");

    var msg = {};
    msg.method = 'deleteDevice';
    //msg.params = [deviceId];

    nats.request('core_in', JSON.stringify(msg), {'max':1}, function(rsp) {
        console.log('Got a response for deleteDevice: ' + rsp);

        res.send(rsp);
        return next();
    });
}

