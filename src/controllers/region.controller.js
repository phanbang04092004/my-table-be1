
const regionService = require('../services/region.service');

const getRegions = async (req, res) => {
    try {
        const regions = await regionService.getAllRegions();
        res.status(200).json({ success: true, data: regions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getRegionDetail = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid ID format." });

    try {
        const region = await regionService.getRegionById(id);
        if (!region) {
            return res.status(404).json({ success: false, message: `Region with ID ${id} not found.` });
        }
        res.status(200).json({ success: true, data: region });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createNewRegion = async (req, res) => {
    const { region_code, region_name } = req.body;
    if (!region_code || !region_name) {
        return res.status(400).json({ success: false, message: "Missing required fields: region_code and region_name." });
    }

    try {
        const newRegion = await regionService.createRegion(req.body);
        res.status(201).json({ success: true, data: newRegion, message: "Region created successfully." });
    } catch (error) {
        if (error.message.includes('Region Code already exists')) {
            return res.status(409).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateExistingRegion = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid ID format." });

    try {
        const updatedRegion = await regionService.updateRegion(id, req.body);
        if (!updatedRegion) {
            return res.status(404).json({ success: false, message: `Region with ID ${id} not found for update.` });
        }
        res.status(200).json({ success: true, data: updatedRegion, message: "Region updated successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const deleteExistingRegion = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid ID format." });

    try {
        const isDeleted = await regionService.deleteRegion(id);
        if (!isDeleted) {
            return res.status(404).json({ success: false, message: `Region with ID ${id} not found for deletion.` });
        }
        res.status(200).json({ success: true, message: "Region deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getRegions,
    getRegionDetail,
    createNewRegion,
    updateExistingRegion,
    deleteExistingRegion,
};