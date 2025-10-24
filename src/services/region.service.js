const models = require('../sequelize/models');

const invalidIdError = (id) => {
    if (id === null || id === undefined) {
        throw new Error(`ID không hợp lệ.`);
    }
    const numId = Number(id);
    if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
        throw new Error(`Không tìm được vùng với ID ${id}.`);
    }
    return numId;
};

const Region = models.Region;

const getAllRegions = async () => {
    try {
        const regions = await Region.findAll({
            order: [['region_code', 'ASC']],
            attributes: ['region_id', 'region_code', 'region_name'],
        });
        return regions;
    } catch (error) {
        console.error("Lỗi trong region.service.js (getAllRegions):", error);
        throw new Error('Không lấy được dữ liệu Vùng.');
    }
};

const getRegionById = async (id) => {
    try {
        const validId = invalidIdError(id);
        const region = await Region.findByPk(validId, {
            attributes: ['region_id', 'region_code', 'region_name'],
        });
        if (!region) {
            throw new Error(`Không tìm được vùng với ID ${validId}.`);
        }
        return region;
    } catch (error) {
        console.error("Lỗi trong region.service.js (getRegionById):", error);
        throw error;
    }
};


module.exports = {
    getAllRegions,
    getRegionById,
};
