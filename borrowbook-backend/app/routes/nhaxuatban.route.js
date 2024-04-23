const express = require('express');
const NhaXuatBan = require('../controllers/nhaxuatban.controller');

const router = express.Router();

router.route('/')
    .get(NhaXuatBan.findAll)
    .post(NhaXuatBan.create)
    .delete(NhaXuatBan.deleteAll);

router.route('/:id')
    .get(NhaXuatBan.findOne)
    .put(NhaXuatBan.update)
    .delete(NhaXuatBan.delete);

module.exports = router;