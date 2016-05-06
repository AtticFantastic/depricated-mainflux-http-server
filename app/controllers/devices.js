var mongojs = require('mongojs');

var jwt = require('jsonwebtoken');
var config = require('../../config');
var log = require('../logger');

var os = require('os');

/** createDevice() */
exports.createDevice = function(req, res, next) {

    console.log("req.headers['x-auth-token'] = ", req.headers['x-auth-token']);
    console.log("req.headers['content-type'] = ", req.headers['content-type']);
        
    /** Save the device and check for errors */
    console.log("createDevice()");

    return next();
}

/** getAllDevices() */
exports.getAllDevices = function(req, res, next) {

	console.log("req.headers['x-auth-token'] = ", req.headers['x-auth-token']);

    console.log("getAllDevices()");
}

/** getDevice() */
exports.getDevice = function(req, res, next) {

    console.log("getDevice()");
}

/** updateDevice() */
exports.updateDevice = function(req, res, next) {
    
    console.log("updateDevice()");
}

/** deleteDevice() */
exports.deleteDevice = function(req, res, next) {

    console.log("deleteDevice()");
}

