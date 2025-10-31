const Sequelize = require('sequelize');
const { sequelize } = require('../config');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js'
    ))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

const { Content, Kpi, DetailsKpi, DaysKpi, SalesRoute } = db;


if (Content && Kpi && DetailsKpi && DaysKpi) {
    Content.hasMany(Kpi, { foreignKey: 'content_id', as: 'Kpis' });
    Kpi.belongsTo(Content, { foreignKey: 'content_id', as: 'Content' });

    Kpi.hasMany(DetailsKpi, { foreignKey: 'kpi_id', as: 'DetailsKpis' });
    DetailsKpi.belongsTo(Kpi, { foreignKey: 'kpi_id', as: 'Kpi' });

    DetailsKpi.hasMany(DaysKpi, { foreignKey: 'detailskpi_id', as: 'DaysKpis' });
    DaysKpi.belongsTo(DetailsKpi, { foreignKey: 'detailskpi_id', as: 'DetailsKpi' });

    if (SalesRoute) {
        SalesRoute.hasMany(DaysKpi, { foreignKey: 'route_id', as: 'DaysKpis' });
        DaysKpi.belongsTo(SalesRoute, { foreignKey: 'route_id', as: 'SalesRoute' });
    }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
