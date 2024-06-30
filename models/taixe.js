const mongoose = require('mongoose');

const taixeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    NgaySinh: {
        type: String,
        required: true
    },
    DiaChi: {
        type: String,
        required: true
    },
    SDT: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    SoGiayPhep: {
        type: String,
        required: true
    },
    NgayCap: {
        type: String,
        required: true
    },
    BienSoXe: {
        type: String,
        required: true
    },
    LoaiXe: {
        type: String,
        required: true
    },
    SoGhe: {
        type: Number,
        required: true
    },
    TrangThai: {
        type: String,
        required: true
    }
});

const Taixe = mongoose.model('Taixe', taixeSchema);

module.exports = Taixe;
