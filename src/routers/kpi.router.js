// routes/kpiRoutes.js
const express = require('express');
const router = express.Router();
const kpiController = require('../controllers/kpi.controller');

router.get('/kpi/:salesRoute/:month', kpiController.getKpiByRouteAndMonth);
router.get('/routes', kpiController.getAllRoutes);
router.get('/months/:salesRoute', kpiController.getAvailableMonths);

module.exports = router;
