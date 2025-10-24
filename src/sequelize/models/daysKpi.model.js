const { DataTypes } = require('sequelize');

module.exports = (sequenlize) => {
    const DaysKpi = sequenlize.define('dayskpi', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        date: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        days_kpi: {
            type: DataTypes.INTEGER,
            unique: true,
        },


    });
    return DaysKpi;
}