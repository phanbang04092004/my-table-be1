
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SalesRoute = sequelize.define('SalesRoute', {
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

    }, {
        tableName: 'sales_routes',
        timestamps: false,
    }
    );


    return SalesRoute;
};