const e = require('express');
const { ObjectId } = require('mongodb');
//const { db } = require('../config');
class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection('nhanvien');
    }

    // dinh nghia cac phuong thuc truy suat csdl su dung mongodb api
    extractNhaXuatBanData(payload) {
        const NhanVien = {
           HoTenNV : payload.HoTenNV,
           Password : payload.Password,
           ChucVu: payload.ChucVu,
           DiaChi: payload.DiaChi,
           SoDienThoai: payload.SoDienThoai,
        };

        
        Object.keys(NhanVien).forEach(
            key => NhanVien[key] === undefined && delete NhanVien[key]
        );
            
        return NhanVien;
    }

    async create(payload) {
        const NhanVien = this.extractNhaXuatBanData(payload);
        const result = this.NhanVien.insertOne(NhanVien);
        return result;
    }

    async signIn(payload) {
        const filter = {
            SoDienThoai: payload.SoDienThoai,
            Password: payload.Password,
        };
        const result = await this.NhanVien.findOne(filter);
        return {"_id": result._id};
    }

    async find(filter) {
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
       return await this.find({
            Ten: {$regex: new RegExp(name), $options: 'i'},
       });
    }

    async findById(id) {
        return await this.NhanVien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhaXuatBanData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.NhanVien.deleteOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.NhanVien.deleteMany({});
        return result;
    }


}

module.exports = NhanVienService;

