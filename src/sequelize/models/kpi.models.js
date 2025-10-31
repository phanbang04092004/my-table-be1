const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Kpi = sequelize.define('Kpi', {
        kpi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kpi_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        content_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'kpis',
        timestamps: false,
    });

    return Kpi;
};
