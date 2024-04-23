const express = require('express');
const NhanVien = require('../controllers/nhanvien.controller');

const router = express.Router();

router.route('/')
    .get(NhanVien.findAll)
    .post(NhanVien.create)
    .delete(NhanVien.deleteAll);

router.route('/:id')
    .get(NhanVien.findOne)
    .put(NhanVien.update)
    .delete(NhanVien.delete);

router.route('/signin')
    .post(NhanVien.signIn);

module.exports = router;