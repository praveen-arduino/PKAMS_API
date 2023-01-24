const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id:{type: DataTypes.INTEGER, allowNull: false},
        device_serial: { type: DataTypes.STRING, allowNull: false }
    };

    return sequelize.define('User_Device', attributes);
}