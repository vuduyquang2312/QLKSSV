const mongoose = require('mongoose');

const veSchema = new mongoose.Schema({
    maVe: { type: String, required: true },
    tenHanhKhach: { type: String, required: true },
    sdt: { type: String, required: true },
    email: { type: String, required: true },
    diaChi: { type: String, required: true },
    maTuyenDuong: { type: String, required: true },
    diemXuatPhat: { type: String, required: true },
    diemDen: { type: String, required: true },
    thoiGianKhoiHanh: { type: String, required: true },
    giaVe: { type: String, required: true },
    trangThai: { type: String, required: true }
});

const Ve = mongoose.model('Ve', veSchema);

module.exports = Ve;
