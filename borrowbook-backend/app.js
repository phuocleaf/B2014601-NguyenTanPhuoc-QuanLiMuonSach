const express = require('express');
const cors = require('cors');

const NhaXuatBanRouter = require("./app/routes/nhaxuatban.route");
const DocGiaRouter = require("./app/routes/docgia.route");
const NhanVienRouter = require("./app/routes/nhanvien.route");
const SachRouter = require("./app/routes/sach.route");

const ApiError = require('./app/api-error');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({message: 'welcome to borow book application'})
});

app.use("/api/nhaxuatban", NhaXuatBanRouter);
app.use("/api/docgia", DocGiaRouter);
app.use("/api/nhanvien", NhanVienRouter);
app.use("/api/sach", SachRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, 'Resource Not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
