const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const DaysKpi = sequelize.define('DaysKpi', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        days_kpi: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        detailskpi_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        route_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        monthly_accumulated: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'dayskpi',
        timestamps: false,
    });

    return DaysKpi;
};
