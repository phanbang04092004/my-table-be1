
const mockRegion = {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
};


jest.doMock('../src/sequelize/models', () => ({
    Region: mockRegion,
    Op: {},
}));

const regionService = require('../src/services/region.service');

describe('Region Service Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    describe('getAllRegions', () => {
        const mockRegions = [
            { region_id: 1, region_code: 'A', region_name: 'Region A' },
            { region_id: 2, region_code: 'B', region_name: 'Region B' },
        ];

        it('should return all regions sorted by region_code', async () => {
            mockRegion.findAll.mockResolvedValue(mockRegions);

            const regions = await regionService.getAllRegions();

            expect(mockRegion.findAll).toHaveBeenCalledWith({
                order: [['region_code', 'ASC']],
                attributes: ['region_id', 'region_code', 'region_name'],
            });

            expect(regions).toEqual(mockRegions);
        });


    });


    describe('getRegionById', () => {
        const regionId = 10;
        const mockRegionData = { region_id: regionId, region_code: 'C', region_name: 'Region C' };

        it('should return a region if found', async () => {
            mockRegion.findByPk.mockResolvedValue(mockRegionData);

            const region = await regionService.getRegionById(regionId);

            expect(mockRegion.findByPk).toHaveBeenCalledWith(regionId);
            expect(region).toEqual(mockRegionData);
        });

        it('should return null if region is not found', async () => {
            mockRegion.findByPk.mockResolvedValue(null);

            const region = await regionService.getRegionById(regionId);

            expect(region).toBeNull();
        });

        it('should throw an error if fetching fails', async () => {
            mockRegion.findByPk.mockRejectedValue(new Error('Query error'));

            await expect(regionService.getRegionById(regionId)).rejects.toThrow(`Could not find region with ID ${regionId}.`);
        });
    });

    describe('createRegion', () => {
        const newData = { region_code: 'D', region_name: 'Region D' };
        const newRegion = { region_id: 5, ...newData };

        it('should successfully create and return the new region', async () => {
            mockRegion.create.mockResolvedValue(newRegion);

            const result = await regionService.createRegion(newData);

            expect(mockRegion.create).toHaveBeenCalledWith(newData);
            expect(result).toEqual(newRegion);
        });

        it('should throw a custom error for SequelizeUniqueConstraintError', async () => {
            const uniqueError = new Error('Duplicate key');
            uniqueError.name = 'SequelizeUniqueConstraintError';
            mockRegion.create.mockRejectedValue(uniqueError);

            await expect(regionService.createRegion(newData)).rejects.toThrow('Region Code already exists.');
        });

        it('should throw a generic error for other exceptions', async () => {
            mockRegion.create.mockRejectedValue(new Error('DB error'));

            await expect(regionService.createRegion(newData)).rejects.toThrow('Could not create new region.');
        });
    });


    describe('updateRegion', () => {
        const regionId = 1;
        const updateData = { region_name: 'Updated Name' };
        const updatedRegionData = { region_id: regionId, region_code: 'A', ...updateData };

        it('should return the updated region if successful', async () => {

            mockRegion.update.mockResolvedValue([1]);

            mockRegion.findByPk.mockResolvedValue(updatedRegionData);

            const result = await regionService.updateRegion(regionId, updateData);

            expect(mockRegion.update).toHaveBeenCalledWith(updateData, {
                where: { region_id: regionId },
            });
            expect(mockRegion.findByPk).toHaveBeenCalledWith(regionId);
            expect(result).toEqual(updatedRegionData);
        });

        it('should return null if the region is not found (updatedRows === 0)', async () => {
            mockRegion.update.mockResolvedValue([0]);

            const result = await regionService.updateRegion(regionId, updateData);

            expect(mockRegion.update).toHaveBeenCalledTimes(1);
            expect(mockRegion.findByPk).not.toHaveBeenCalled();
            expect(result).toBeNull();
        });

        it('should throw an error if updating fails', async () => {
            mockRegion.update.mockRejectedValue(new Error('Update failed'));

            await expect(regionService.updateRegion(regionId, updateData)).rejects.toThrow(`Could not update region with ID ${regionId}.`);
        });
    });

    describe('deleteRegion', () => {
        const regionId = 99;

        it('should return true if the region is deleted (deletedRows > 0)', async () => {
            // Mock destroy trả về 1 (1 hàng bị xóa)
            mockRegion.destroy.mockResolvedValue(1);

            const result = await regionService.deleteRegion(regionId);

            expect(mockRegion.destroy).toHaveBeenCalledWith({
                where: { region_id: regionId },
            });
            expect(result).toBe(true);
        });

        it('should return false if the region is not found (deletedRows === 0)', async () => {
            // Mock destroy trả về 0 (0 hàng bị xóa)
            mockRegion.destroy.mockResolvedValue(0);

            const result = await regionService.deleteRegion(regionId);

            expect(result).toBe(false);
        });

        it('should throw an error if deletion fails', async () => {
            mockRegion.destroy.mockRejectedValue(new Error('Delete failed'));

            await expect(regionService.deleteRegion(regionId)).rejects.toThrow(`Could not delete region with ID ${regionId}.`);
        });
    });
});