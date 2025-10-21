const express = require('express');
const regionController = require('../controllers/region.controller');

const router = express.Router();

router.get('/', regionController.getRegions);
router.post('/', regionController.createNewRegion);

router.get('/:id', regionController.getRegionDetail);
router.put('/:id', regionController.updateExistingRegion);

router.delete('/:id', regionController.deleteExistingRegion);

module.exports = router;