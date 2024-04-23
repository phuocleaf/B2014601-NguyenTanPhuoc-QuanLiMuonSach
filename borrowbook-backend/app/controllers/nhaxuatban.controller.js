const ApiError = require("../api-error");
const NhaXuatBanService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.TenNXB){
        return next(new ApiError(400, 'TenNXB can not be empty'));
    }

    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const document = await nhaxuatbanService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the nhaxuatban'));
    }

}

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await nhaxuatbanService.findByName(name);
        } else {
            documents = await nhaxuatbanService.findNXB({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving nhaxuatban'));
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    console.log(req.params);
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const document = await nhaxuatbanService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'NhaXuatBan not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving nhaxuatban with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const document = await nhaxuatbanService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'NhaXuatBan not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error updating nhaxuatban with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const document = await nhaxuatbanService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'NhaXuatBan not found'));
        }
        return res.send({ message: 'NhaXuatBan was deleted successfully' });
    } catch (error) {
        return next(new ApiError(500, `Error deleting nhaxuatban with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const documents = await nhaxuatbanService.delete({});
        return res.send({ message: 'All nhaxuatban were deleted successfully' });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting all nhaxuatban'));
    }
};