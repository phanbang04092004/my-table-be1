const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Content = sequelize.define('contents', {
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
    });
    return Content;
}