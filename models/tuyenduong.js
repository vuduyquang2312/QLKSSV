const mongoose = require('mongoose');

// Định nghĩa schema cho TuyenDuong
const TuyenDuongSchema = new mongoose.Schema({
    MaTuyenDuong: {
        type: String,
        required: true,
        unique: true
    },
    DiemXuatPhat: {
        type: String,
        required: true
    },
    DiemDen: {
        type: String,
        required: true
    },
    ThoiGianKhoiHanh: {
        type: String,
        require: true
    },
    GiaVe: {
        type: String,
        required: true
    }
});

// Tạo model từ schema
const TuyenDuong = mongoose.model('TuyenDuong', TuyenDuongSchema);

module.exports = TuyenDuong;
