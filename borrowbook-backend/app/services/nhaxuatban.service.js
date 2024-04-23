const { ObjectId } = require('mongodb');
//const { db } = require('../config');
class NhaXuatBanService {
    constructor(client) {
        this.NhaXuatBan = client.db().collection('nhaxuatban');
    }

    // dinh nghia cac phuong thuc truy suat csdl su dung mongodb api
    extractNhaXuatBanData(payload) {
        const NhaXuatBan = {
            TenNXB : payload.TenNXB,
            DiaChi: payload.DiaChi,
        };

        
        Object.keys(NhaXuatBan).forEach(
            key => NhaXuatBan[key] === undefined && delete NhaXuatBan[key]
        );
            
        return NhaXuatBan;
    }

    async create(payload) {
        const NhaXuatBan = this.extractNhaXuatBanData(payload);
        const result = this.NhaXuatBan.insertOne(NhaXuatBan);
        return result;
    }

    async find(filter) {
        const cursor = await this.NhaXuatBan.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
       return await this.find({
            TenNXB: {$regex: new RegExp(name), $options: 'i'},
       });
    }

    async findById(id) {
        return await this.NhaXuatBan.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhaXuatBanData(payload);
        const result = await this.NhaXuatBan.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.NhaXuatBan.deleteOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.NhaXuatBan.deleteMany({});
        return result;
    }

    async findNXB() {
        return await this.find({});
    }

    
    async findByName(name) {
       return await this.find({
            TenSach: {$regex: new RegExp(name), $options: 'i'},
       });
    }

    async findById(id) {
        return await this.NhaXuatBan.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }


}



module.exports = NhaXuatBanService;