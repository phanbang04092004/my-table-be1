const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Content = sequelize.define('Content', {
        content_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        }
    }, {
        tableName: 'contents',
        timestamps: false,
    });

    return Content;
};
