const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Area = sequelize.define('areas', {
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
        // region_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
    });

    // Area.associate = (models) => {
    //     Area.belongsTo(models.Region, {
    //         foreignKey: 'region_id',
    //     });
    //     Area.hasMany(models.Distributor, {
    //         foreignKey: 'area_id',
    //         onDelete: 'CASCADE',
    //     });
    // };

    return Area;
};