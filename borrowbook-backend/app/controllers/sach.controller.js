const ApiError = require("../api-error");
const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    console.log("create", req.body)
    if (!req.body?.TenSach){
        return next(new ApiError(400, 'TenSach can not be empty'));
    }

    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the sach'));
    }

}

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const sachService = new SachService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await sachService.findByName(name);
        } else {
            documents = await sachService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving sach'));
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Sach not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving sach'));
    }
};

exports.update = async (req, res, next) => {
    console.log('update', req.body)
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Sach not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while updating sach'));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Sach not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting sach'));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.deleteAll();
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting sach'));
    }
};

exports.findByNXB = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findSachByNXB(req.params.id);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving sach'));
    }
};

exports.findByTacGia = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findSachByTacGia(req.params.TacGia);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving sach'));
    }
};


exports.findByName = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findSachByName(req.params.name);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving sach'));
    }
};



