const mongoose = require('mongoose');

const xeSchema = new mongoose.Schema({
    BienSoXe: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        enum: ['Hoạt động', 'Bảo dưỡng', 'Nghỉ'],
        default: 'Hoạt động'
    }
});

const Xe = mongoose.model('Xe', xeSchema);

module.exports = Xe;
