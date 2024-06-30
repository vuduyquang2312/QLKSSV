require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const Xe = require('./models/xe');
const Taixe = require('./models/taixe');
const TuyenDuong = require('./models/tuyenduong');
const Ve = require('./models/ve');

// Middleware để parse JSON
app.use(express.json());

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Route cơ bản
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route để thêm mới một xe
app.post('/xe', async (req, res) => {
    try {
        const newXe = new Xe(req.body);
        await newXe.save();
        res.status(201).send(newXe);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/tuyenduong', async (req, res) => {
    try {
        const { MaTuyenDuong, DiemXuatPhat, DiemDen, ThoiGianKhoiHanh, GiaVe } = req.body;

        // Tạo một đối tượng tuyến đường mới
        const newTuyenDuong = new TuyenDuong({
            MaTuyenDuong,
            DiemXuatPhat,
            DiemDen,
            ThoiGianKhoiHanh,
            GiaVe
        });

        // Lưu vào cơ sở dữ liệu
        await newTuyenDuong.save();

        res.status(201).json(newTuyenDuong);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/tuyenduong', async (req, res) => {
    try {
        const allTuyenDuong = await TuyenDuong.find();
        res.status(200).send(allTuyenDuong);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/xe', async (req, res) => {
    try {
        const allXe = await Xe.find();
        res.status(200).send(allXe);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route để xóa thông tin xe dựa trên biển số xe
app.delete('/api/xe', async (req, res) => {
    const bienSoXe = req.query.BienSoXe; // Lấy biển số xe từ query params

    try {
        const deletedXe = await Xe.findOneAndDelete({ BienSoXe: bienSoXe });

        if (!deletedXe) {
            return res.status(404).send({ error: 'Không tìm thấy xe để xóa' });
        }

        res.status(200).send({ message: 'Xóa xe thành công', deletedXe });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route để thêm mới một tài xế
app.post('/taixe', async (req, res) => {
    try {
        const newTaixe = new Taixe(req.body);
        await newTaixe.save();
        res.status(201).send(newTaixe);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/api/taixe', async (req, res) => {
    try {
        const allTaixe = await Taixe.find();
        res.status(200).send(allTaixe);
    } catch (err) {
        res.status(500).send(err);
    }
});
// Route để cập nhật thông tin tài xế
app.put('/api/taixe/:sdt', async (req, res) => {
    const sdt = req.params.sdt;
    const updatedData = req.body;

    try {
        const updatedTaiXe = await Taixe.findOneAndUpdate({ SDT: sdt }, updatedData, { new: true });

        if (!updatedTaiXe) {
            return res.status(404).send({ error: 'Không tìm thấy tài xế để cập nhật' });
        }

        res.status(200).send({ message: 'Cập nhật thông tin tài xế thành công', updatedTaiXe });
    } catch (err) {
        res.status(500).send(err);
    }
});
app.put('/api/tuyenduong/:maTuyenDuong', async (req, res) => {
    const { maTuyenDuong } = req.params; // Lấy mã tuyến đường từ URL parameter
    const updatedTuyenDuong = req.body; // Dữ liệu cập nhật từ request body

    try {
        const result = await TuyenDuong.findOneAndUpdate({ MaTuyenDuong: maTuyenDuong }, updatedTuyenDuong, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy tuyến đường để cập nhật.' });
        }
        res.json(result); // Trả về dữ liệu của tuyến đường đã được cập nhật
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật tuyến đường.' });
    }
});
// Thêm route xóa tài xế theo SDT
app.delete('/api/taixe', async (req, res) => {
    const soDienThoai = req.query.SDT;

    if (!soDienThoai) {
        return res.status(400).send({ error: 'Số điện thoại là bắt buộc' });
    }

    try {
        const deletedTaixe = await Taixe.findOneAndDelete({ SDT: soDienThoai });

        if (!deletedTaixe) {
            return res.status(404).send({ error: 'Không tìm thấy tài xế để xóa' });
        }

        res.status(200).send({ message: 'Xóa tài xế thành công', deletedTaixe });
    } catch (err) {
        res.status(500).send(err);
    }
});
app.delete('/api/tuyenduong/:maTuyenDuong', async (req, res) => {
    const { maTuyenDuong } = req.params;

    try {
        const result = await TuyenDuong.findOneAndDelete({ MaTuyenDuong: maTuyenDuong });

        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy tuyến đường để xóa.' });
        }

        res.json({ message: 'Đã xóa tuyến đường thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa tuyến đường.' });
    }
});

app.post('/ve', async (req, res) => {
    // Lấy dữ liệu từ request body
    const veData = req.body;

    try {
        // Tạo một đối tượng Ve từ dữ liệu nhận được
        const newVe = new Ve({
            maVe: veData.MaVe,
            tenHanhKhach: veData.TenHanhKhach,
            sdt: veData.SDT,
            email: veData.Email,
            diaChi: veData.DiaChi,
            maTuyenDuong: veData.MaTuyenDuong,
            diemXuatPhat: veData.DiemXuatPhat,
            diemDen: veData.DiemDen,
            thoiGianKhoiHanh: veData.ThoiGianKhoiHanh,
            giaVe: veData.GiaVe,
            trangThai: veData.TrangThai
        });

        // Lưu đối tượng Ve vào CSDL
        const savedVe = await newVe.save();

        // Gửi phản hồi về cho client
        res.status(200).json({ message: 'Dữ liệu đã được lưu thành công.', ve: savedVe });
    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu vào CSDL: " + error.message);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lưu dữ liệu.' });
    }
});
app.get('/api/ve', async (req, res) => {
    try {
        const allVe = await Ve.find();
        res.status(200).send(allVe);
    } catch (err) {
        res.status(500).send(err);
    }
});
// Lắng nghe kết nối
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
