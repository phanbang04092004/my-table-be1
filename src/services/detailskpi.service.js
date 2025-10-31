const models = require('../sequelize/models');
const DetailsKpi = models.DetailsKpi;

const getAllDetailsKpis = async (kpi_id) => {
    try {
        const t = kpi_id ? { kpi_id } : {};
        const detailskpis = await DetailsKpi.fillAll({
            where: t,
            order: [['detailskpi_name', 'ASC']],
            attributes: ['detailskpi_id', 'detailskpi_name', 'kpi_id'],
        })
        return detailskpis;
    } catch (error) {
        console.error("Lỗi trong detailskpi.service.js (getAllDetailsKpis):", error);
        throw new Error('Không lấy được dữ liệu DetailsKpi.');
    }
}
module.exports = {
    getAllDetailsKpis,
}