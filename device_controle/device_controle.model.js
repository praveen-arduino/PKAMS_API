const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        DevStatus:{type: DataTypes.INTEGER, allowNull: false},
        DevPower: { type: DataTypes.INTEGER, allowNull: false },
        DevSerial: { type: DataTypes.INTEGER, allowNull: false },
        Devinput: { type: DataTypes.INTEGER, allowNull: false },
        DevOutput: { type: DataTypes.INTEGER, allowNull: false },
        DevMsg: { type: DataTypes.STRING, allowNull: false }
    };

    return sequelize.define('Device_Control', attributes);
}