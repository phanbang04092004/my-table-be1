const models = require('../sequelize/models');

const Content = models.Content;

const getAllContents = async () => {
    try {
        const contents = await Content.findAll({
            order: [['content_id', 'ASC']],
            attributes: ['content_id', 'content_name'],
        });
        return contents;
    } catch (error) {
        console.error("Lỗi trong region.service.js (getAllRegions):", error);
        throw new Error('Không lấy được dữ liệu Vùng.');
    }
};



module.exports = {
    getAllContents,
};
