const express = require('express');
const DocGia = require('../controllers/docgia.controller');

const router = express.Router();

router.route('/')
    .get(DocGia.findAll)
    .post(DocGia.create)
    .delete(DocGia.deleteAll);

router.route('/:id')
    .get(DocGia.findOne)
    .put(DocGia.update)
    .delete(DocGia.delete);

router.route('/signin')
    .post(DocGia.signIn);

module.exports = router;