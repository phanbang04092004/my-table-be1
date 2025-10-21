// src/sequelize/models/salesRoute.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SalesRoute = sequelize.define('sales_routes', {
        route_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        route_code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        route_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

    });


    return SalesRoute;
};