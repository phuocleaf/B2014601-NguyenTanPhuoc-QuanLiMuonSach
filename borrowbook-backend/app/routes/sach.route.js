const express = require('express');
const Sach = require('../controllers/sach.controller');

const router = express.Router();

router.route('/')
    .get(Sach.findAll)
    .post(Sach.create)
    .delete(Sach.deleteAll);

router.route('/:id')
    .get(Sach.findOne)
    .put(Sach.update)
    .delete(Sach.delete);

router.route('/findByNXB/:id')
    .get(Sach.findByNXB);

router.route('/findByTen/:name')
    .get(Sach.findByName);

module.exports = router;



