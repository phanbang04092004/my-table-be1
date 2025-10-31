const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Area = sequelize.define('Area', {
        area_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        area_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        area_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        tableName: 'areas',
        timestamps: false,
    }
    );

    return Area;
};