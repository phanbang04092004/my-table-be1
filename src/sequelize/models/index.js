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

// Provide convenient PascalCase singular aliases so code that expects
// models.Region, models.Area, etc. works even when the model was
// defined with a plural name like 'regions'.
// Map common model names we have in this project.
const aliases = {};
if (db.regions) aliases.Region = db.regions;
if (db.areas) aliases.Area = db.areas;
if (db.distributors) aliases.Distributor = db.distributors;
if (db.sales_routes) aliases.SalesRoute = db.sales_routes;

module.exports = Object.assign({}, db, aliases);