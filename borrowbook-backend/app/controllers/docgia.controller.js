const ApiError = require("../api-error");
const DocGiaService = require("../services/docgia.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.Ten){
        return next(new ApiError(400, 'Ten can not be empty'));
    }

    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the docgia'));
    }

}

exports.signIn = async (req, res, next) => {
    if (!req.body?.DienThoai || !req.body?.Password) {
        return next(new ApiError(400, 'DienThoai and Password can not be empty'));
    }

    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.signIn(req.body);
        if (!document) {
            return next(new ApiError(404, 'DocGia not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while signing in docgia'));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await docgiaService.findByName(name);
        } else {
            documents = await docgiaService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving docgia'));
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'DocGia not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving docgia with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'DocGia not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error updating docgia with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.delete(req.params.id);
        if (!document.deletedCount) {
            return next(new ApiError(404, 'DocGia not found'));
        }
        return res.send({ message: 'DocGia was deleted successfully!' });
    } catch (error) {
        return next(new ApiError(500, `Could not delete docgia with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.deleteAll();
        if (!document.deletedCount) {
            return next(new ApiError(404, 'No docgia found to delete'));
        }
        return res.send({ message: 'All docgia were deleted successfully!' });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting all docgia'));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await docgiaService.findByName(name);
        } else {
            documents = await docgiaService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving docgia'));
    }

    return res.send(documents);
};


