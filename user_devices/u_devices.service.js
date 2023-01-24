const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User_Device.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User_Device.findOne({ where: { device_serial: params.device_serial } })) {
        throw 'Devise "' + params.device_serial + '" is already taken';
    }

    // save User_Device
    await db.User_Device.create(params);
}

async function update(id, params) {
    const device = await getUser(id);

    // validate
    const usernameChanged = params.device_serial && device.device_serial !== params.device_serial;
    if (usernameChanged && await db.User_Device.findOne({ where: { device_serial: params.device_serial } })) {
        throw 'Device ' + params.device_serial + ' is already taken';
    }

    // copy params to user and save
    Object.assign(device, params);
    await device.save();

    return omitHash(device.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User_Device.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}