const Sequelize = require('sequelize');
const { sequelize } = require('../config');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach(file => {

        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const aliases = {};
if (db.Region) aliases.Region = db.Region;
if (db.Area) aliases.Area = db.Area;
if (db.Distributor) aliases.Distributor = db.Distributor;
if (db.SalesRoute) aliases.SalesRoute = db.SalesRoute;
if (db.Content) aliases.Content = db.Content;
if (db.DaysKpi) aliases.DaysKpi = db.DaysKpi;
if (db.Kpi) aliases.Kpi = db.Kpi;


module.exports = Object.assign({}, db, aliases);
