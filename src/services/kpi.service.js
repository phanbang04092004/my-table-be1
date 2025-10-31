
const { Content, Kpi, DetailsKpi, DaysKpi, SalesRoute } = require('../sequelize/models');
const { Op } = require('sequelize');

async function getKpiByRouteAndMonthService(salesRoute, month) {
    let year, monthNum;
    if (month.includes('-')) {
        const parts = month.split('-');
        if (parts[0].length === 4) {
            year = parseInt(parts[0]);
            monthNum = parseInt(parts[1]);
        } else {
            monthNum = parseInt(parts[0]);
            year = parseInt(parts[1]);
        }
    } else {
        throw new Error('Format tháng không hợp lệ. Sử dụng: YYYY-MM hoặc MM-YYYY');
    }

    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);

    const whereDays = {
        date: {
            [Op.between]: [
                startDate.toISOString().split('T')[0],
                endDate.toISOString().split('T')[0]
            ]
        }
    };

    if (salesRoute !== 'all') {
        const routeIdNum = parseInt(salesRoute);
        if (!isNaN(routeIdNum)) {
            whereDays.route_id = routeIdNum;
        } else {
            const route = await SalesRoute.findOne({ where: { route_name: salesRoute } });
            if (route) {
                whereDays.route_id = route.route_id;
            } else {
                throw new Error(`Không tìm thấy route: ${salesRoute}`);
            }
        }
    }

    const contents = await Content.findAll({
        include: [
            {
                model: Kpi,
                as: 'Kpis',
                include: [
                    {
                        model: DetailsKpi,
                        as: 'DetailsKpis',
                        include: [
                            {
                                model: DaysKpi,
                                as: 'DaysKpis',
                                where: whereDays,
                                required: false
                            }
                        ]
                    }
                ]
            }
        ],
        order: [
            ['content_id', 'ASC'],
            [{ model: Kpi, as: 'Kpis' }, 'kpi_id', 'ASC'],
            [{ model: Kpi, as: 'Kpis' }, { model: DetailsKpi, as: 'DetailsKpis' }, 'id', 'ASC'],
            [
                { model: Kpi, as: 'Kpis' },
                { model: DetailsKpi, as: 'DetailsKpis' },
                { model: DaysKpi, as: 'DaysKpis' },
                'date',
                'ASC'
            ]
        ]
    });

    const daysOfMonth = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        daysOfMonth.push(d.toISOString().split('T')[0]);
    }

    const rows = [];

    for (const content of contents) {
        for (const kpi of content.Kpis) {
            for (const detail of kpi.DetailsKpis) {
                const dayMap = {};
                let totalValue = 0;
                let countDays = 0;

                for (const day of detail.DaysKpis) {
                    dayMap[day.date] = day.days_kpi;
                    totalValue += parseFloat(day.days_kpi) || 0;
                    countDays++;
                }

                const luyKe = countDays > 0 ? (totalValue / countDays).toFixed(1) + '%' : '0%';

                const days = daysOfMonth.map(dateKey => ({
                    dateKey,
                    metrics: { value: (dayMap[dateKey] || 0) + '%' }
                }));

                rows.push({
                    id: `${kpi.kpi_name.toLowerCase()}-${detail.name.toLowerCase().replace(/\s+/g, '-')}`,
                    section: content.content_name,
                    kpi: kpi.kpi_name,
                    detail: detail.name,
                    luyKe,
                    days
                });
            }
        }
    }

    return {
        success: true,
        route: salesRoute,
        month: `${monthNum}/${year}`,
        rows
    };
}

async function getAllRoutesService() {
    const routes = await SalesRoute.findAll({
        attributes: ['route_id', 'route_name', 'description'],
        order: [['route_name', 'ASC']]
    });

    return {
        success: true,
        data: [
            { route_id: 'all', route_name: 'Tất cả', description: 'Tất cả các tuyến' },
            ...routes
        ]
    };
}

async function getAvailableMonthsService(salesRoute) {
    const whereClause = {};

    if (salesRoute && salesRoute !== 'all') {
        const routeIdNum = parseInt(salesRoute);
        if (!isNaN(routeIdNum)) {
            whereClause.route_id = routeIdNum;
        } else {
            const route = await SalesRoute.findOne({ where: { route_name: salesRoute } });
            if (route) {
                whereClause.route_id = route.route_id;
            }
        }
    }

    const dates = await DaysKpi.findAll({
        attributes: ['date'],
        where: whereClause,
        group: ['date'],
        order: [['date', 'DESC']]
    });

    const monthsSet = new Set();
    dates.forEach(item => {
        const [year, month] = item.date.split('-');
        monthsSet.add(`${year}-${month}`);
    });

    const months = Array.from(monthsSet).map(yearMonth => {
        const [year, month] = yearMonth.split('-');
        return {
            value: yearMonth,
            label: `Tháng ${parseInt(month)}/${year}`
        };
    });

    return { success: true, data: months };
}

module.exports = {
    getKpiByRouteAndMonthService,
    getAllRoutesService,
    getAvailableMonthsService
};
