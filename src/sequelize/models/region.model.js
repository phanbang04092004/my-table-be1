const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Region = sequelize.define('regions', {
        region_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        region_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        region_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    });
    return Region;
};