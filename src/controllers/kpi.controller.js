// controllers/kpiController.js
const {
    getKpiByRouteAndMonthService,
    getAllRoutesService,
    getAvailableMonthsService
} = require('../services/kpi.service');

async function getKpiByRouteAndMonth(req, res) {
    try {
        const { salesRoute, month } = req.params;
        const result = await getKpiByRouteAndMonthService(salesRoute, month);
        return res.json(result);
    } catch (error) {
        console.error('Lỗi Controller - getKpiByRouteAndMonth:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi server khi lấy dữ liệu KPI'
        });
    }
}

async function getAllRoutes(req, res) {
    try {
        const routes = await getAllRoutesService();
        return res.json({ success: true, data: routes });
    } catch (error) {
        console.error('Lỗi Controller - getAllRoutes:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy danh sách tuyến'
        });
    }
}

async function getAvailableMonths(req, res) {
    try {
        const { salesRoute } = req.params;
        const months = await getAvailableMonthsService(salesRoute);
        return res.json({ success: true, data: months });
    } catch (error) {
        console.error('Lỗi Controller - getAvailableMonths:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy danh sách tháng'
        });
    }
}

module.exports = {
    getKpiByRouteAndMonth,
    getAllRoutes,
    getAvailableMonths
};
