const e = require('express');
const { ObjectId } = require('mongodb');
//const { db } = require('../config');
class DocGiaService {
    constructor(client) {
        this.DocGia = client.db().collection('docgia');
    }

    // dinh nghia cac phuong thuc truy suat csdl su dung mongodb api
    extractNhaXuatBanData(payload) {
        const DocGia = {
            HoLot : payload.HoLot,
            Ten : payload.Ten,
            NgaySinh: payload.NgaySinh,
            Phai: payload.Phai,
            DiaChi: payload.DiaChi,
            DienThoai: payload.DienThoai,
            Password: payload.Password,
        };

        
        Object.keys(DocGia).forEach(
            key => DocGia[key] === undefined && delete DocGia[key]
        );
            
        return DocGia;
    }

    async create(payload) {
        const DocGia = this.extractNhaXuatBanData(payload);
        const exitDocGia = await this.DocGia.findOne({DienThoai: payload.DienThoai});
        if (exitDocGia) {
            return null;
        }
        const result = this.DocGia.insertOne(DocGia);
        return result;
    }

    async signIn(payload) {
        const filter = {
            DienThoai: payload.DienThoai,
            Password: payload.Password,
        };
        const result = await this.DocGia.findOne(filter);
        return {"_id": result._id};
    }

    async find(filter) {
        const cursor = await this.DocGia.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
       return await this.find({
            Ten: {$regex: new RegExp(name), $options: 'i'},
       });
    }

    async findById(id) {
        return await this.DocGia.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhaXuatBanData(payload);
        const result = await this.DocGia.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.DocGia.deleteOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.DocGia.deleteMany({});
        return result;
    }

}

module.exports = DocGiaService;

