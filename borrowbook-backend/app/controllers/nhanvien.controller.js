const ApiError = require("../api-error");
const NhanVienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");


exports.create = async (req, res, next) => {
    if (!req.body?.HoTenNV){
        return next(new ApiError(400, 'TenNV can not be empty'));
    }

    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the nhanvien'));
    }

}

exports.signIn = async (req, res, next) => {
    if (!req.body?.SoDienThoai || !req.body?.Password){
        return next(new ApiError(400, 'TenNV and MatKhau can not be empty'));
    }

    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.signIn(req.body);
        if (!document) {
            return next(new ApiError(404, 'NhanVien not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while signing in'));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await nhanvienService.findByName(name);
        } else {
            documents = await nhanvienService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving nhanvien'));
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'NhanVien not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving nhanvien with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'NhanVien not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error updating nhanvien with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'NhanVien not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error deleting nhanvien with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.deleteAll();
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting nhanvien'));
    }
};

