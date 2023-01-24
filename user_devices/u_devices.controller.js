const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userDeviceService=require('./u_devices.service');

// routes
router.post('/deviceadd', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        device_serial: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userDeviceService.create(req.body)
        .then(() => res.json({ message: 'Adedd successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    userDeviceService.getAll()
        .then(user_Devices => res.json(user_Devices))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userDeviceService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number.empty(''),
        device_serial: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userDeviceService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userDeviceService.delete(req.params.id)
        .then(() => res.json({ message: 'Device deleted successfully' }))
        .catch(next);
}