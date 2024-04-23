const e = require('express');
const { ObjectId, MongoClient } = require('mongodb');
const NhaXuatBanService = require('./nhaxuatban.service');
const MongoDB = require('../utils/mongodb.util');
//const { db } = require('../config');
class SachService {
    constructor(client) {
        this.Sach = client.db().collection('sach');
    }

    // dinh nghia cac phuong thuc truy suat csdl su dung mongodb api
    extractNhaXuatBanData(payload) {
        const Sach = {
            TenSach : payload.TenSach,
            DonGia: payload.DonGia,
            SoQuyen: payload.SoQuyen,
            NamXuatBan: payload.NamXuatBan,
            MaNXB: payload.MaNXB,
            NguonGoc: payload.NguonGoc,
            TacGia: payload.TacGia,
        };

        
        Object.keys(Sach).forEach(
            key => Sach[key] === undefined && delete Sach[key]
        );
            
        return Sach;
    }

    async create(payload) {
        const Sach = this.extractNhaXuatBanData(payload);
        const result = this.Sach.insertOne(Sach);
        return result;
    }


    // async find(filter) {
    //     const cursor = await this.Sach.find(filter);
    //     return await cursor.toArray();
    // }

    async find(filter) {
        const cursor = await this.Sach.find(filter);
        const books = await cursor.toArray();
        const nxbService = new NhaXuatBanService(MongoDB.client); 

        // const results = await Promise.all(books.map((book) => nxbService.findById(book.MaNXB)))

        // for(let i = 0; i < books.length; i++) {
        //     books[i].TenNXB = results[i].TenNXB;
        // }

        for (const book of books) {
            const NXB = await nxbService.findById(book.MaNXB);
            book.TenNXB = NXB ? NXB.TenNXB : null;
            book.DiaChi = NXB ? NXB.DiaChi : null;
        }
        return books; 
    }
    
    
    

    async findByName(name) {
       return await this.find({
            TenSach: {$regex: new RegExp(name), $options: 'i'},
       });
    }

    async findById(id) {
        return await this.Sach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhaXuatBanData(payload);
        const result = await this.Sach.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
    
    async delete(id) {
        const result = await this.Sach.deleteOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Sach.deleteMany({});
        return result;
    }

    async findSachByNXB(id) {
        return await this.find({
            MaNXB: id,
        });
    }

    async findSachByTacGia(TacGia) {
        return await this.find({
            TacGia: TacGia,
        });
    }

    async findSachByNamXuatBan(NamXuatBan) {
        return await this.find({
            NamXuatBan: NamXuatBan,
        });
    }

    async findSachByName(name) {
        return await this.find({
            TenSach: name,
        });
    }

}


module.exports = SachService;

