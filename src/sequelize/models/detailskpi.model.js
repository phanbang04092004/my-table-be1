const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const DetailsKpi = sequelize.define('DetailsKpi', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        kpi_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'detailskpi',
        timestamps: false,
    });

    return DetailsKpi;
};
