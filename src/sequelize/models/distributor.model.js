const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Distributor = sequelize.define('Distributor', {
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
    }, {
        tableName: 'distributors',
        timestamps: false,
    }
    );


    return Distributor;
};