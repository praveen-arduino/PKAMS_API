const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const deviceService = require('./device.service');

// routes
//router.post('/authenticate', authenticateSchema, authenticate);
router.post('/deviceadd', authorize(),registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function registerSchema(req, res, next) {
    const schema = Joi.object({
        device_serial: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    deviceService.create(req.body)
        .then(() => res.json({ message: 'Create successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    deviceService.getAll()
        .then(Devices => res.json(Devices))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.Device);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(Device => res.json(Device))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        device_serial: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    deviceService.update(req.params.id, req.body)
        .then(device => res.json(device))
        .catch(next);
}

function _delete(req, res, next) {
    deviceService.delete(req.params.id)
        .then(() => res.json({ message: 'Device deleted successfully' }))
        .catch(next);
}