const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

module.exports = (sequelize) => {
    const Kpi = sequelize.define('kpis', {
        kpi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kpi_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        }
    });
    return Kpi;
}