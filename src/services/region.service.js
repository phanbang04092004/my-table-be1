const models = require('../sequelize/models');


const Region = models.Region;
const getAllRegions = async () => {
    try {
        const regions = await Region.findAll({
            order: [
                ['region_code', 'ASC']
            ],
            attributes: ['region_id', 'region_code', 'region_name'],
        });
        return regions;
    } catch (error) {
        console.error("Error in region.service.js (getAllRegions):", error);
        throw new Error('Could not fetch regions.');
    }
};


const getRegionById = async (id) => {
    try {
        const region = await Region.findByPk(id);
        return region;
    } catch (error) {
        console.error("Error in region.service.js (getRegionById):", error);
        throw new Error(`Could not find region with ID ${id}.`);
    }
};

const createRegion = async (data) => {
    try {
        const newRegion = await Region.create(data);
        return newRegion;
    } catch (error) {
        console.error("Error in region.service.js (createRegion):", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Region Code already exists.');
        }
        throw new Error('Could not create new region.');
    }
};


const updateRegion = async (id, data) => {
    try {
        const [updatedRows] = await Region.update(data, {
            where: { region_id: id },
        });
        if (updatedRows === 0) {
            return null;
        }
        return getRegionById(id);
    } catch (error) {
        console.error("Error in region.service.js (updateRegion):", error);
        throw new Error(`Could not update region with ID ${id}.`);
    }
};

const deleteRegion = async (id) => {
    try {
        const deletedRows = await Region.destroy({
            where: { region_id: id },
        });
        return deletedRows > 0;
    } catch (error) {
        console.error("Error in region.service.js (deleteRegion):", error);
        throw new Error(`Could not delete region with ID ${id}.`);
    }
};

module.exports = {
    getAllRegions,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion,
};