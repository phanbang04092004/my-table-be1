const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Distributor = sequelize.define('distributors', {
        distributor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        distributor_code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        distributor_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    });


    return Distributor;
};