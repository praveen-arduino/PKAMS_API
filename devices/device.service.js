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

// async function authenticate({ username, password }) {
//     const user = await db.Device.scope('withHash').findOne({ where: { username } });

//     if (!user || !(await bcrypt.compare(password, user.hash)))
//         throw 'Username or password is incorrect';

//     // authentication successful
//     const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
//     return { ...omitHash(user.get()), token };
// }

async function getAll() {
    return await db.Device.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.Device.findOne({ where: { device_serial: params.device_serial } })) {
        throw 'Device "' + params.device_serial + '" is already taken';
    }

    // hash password
    // if (params.password) {
    //     params.hash = await bcrypt.hash(params.password, 4);
    // }

    // save Device
    await db.Device.create(params);
}

async function update(id, params) {
    const Device = await getUser(id);

    // validate
    const usernameChanged = params.device_serial && Device.device_serial !== params.device_serial;
    if (usernameChanged && await db.Device.findOne({ where: { device_serial: params.device_serial } })) {
        throw 'Device "' + params.device_serial + '" is already taken';
    }

    // hash password if it was entered
    // if (params.password) {
    //     params.hash = await bcrypt.hash(params.password, 4);
    // }

    // copy params to Device and save
    Object.assign(Device, params);
    await Device.save();

    return omitHash(Device.get());
}

async function _delete(id) {
    const Device = await getUser(id);
    await Device.destroy();
}

// helper functions

async function getUser(id) {
    const Device = await db.Device.findByPk(id);
    if (!Device) throw 'Device not found';
    return Device;
}

function omitHash(Device) {
    const { hash, ...userWithoutHash } = Device;
    return userWithoutHash;
}