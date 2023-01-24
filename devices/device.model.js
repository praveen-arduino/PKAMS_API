const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        device_serial: { type: DataTypes.STRING, allowNull: false }
    };

    // const options = {
    //     defaultScope: {
    //         // exclude hash by default
    //         attributes: { exclude: ['hash'] }
    //     },
    //     scopes: {
    //         // include hash with this scope
    //         withHash: { attributes: {}, }
    //     }
    // };

    return sequelize.define('Device', attributes);
}