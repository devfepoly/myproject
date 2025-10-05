import express from 'express';
import Address from '../models/address.js';

const router = express.Router();

// GET - Lấy tất cả địa chỉ
router.get('/', async (req, res, next) => {
    try {
        let results = await Address.find({}).populate('user_id', 'name email');
        return res.json({
            success: true,
            data: results
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách địa chỉ',
            error: error.message
        });
    }
});

// GET - Lấy địa chỉ theo ID
router.get('/:id', async (req, res, next) => {
    try {
        const address = await Address.findById(req.params.id).populate('user_id', 'name email');
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy địa chỉ'
            });
        }
        return res.json({
            success: true,
            data: address
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy địa chỉ',
            error: error.message
        });
    }
});

// GET - Lấy địa chỉ theo user_id
router.get('/user/:userId', async (req, res, next) => {
    try {
        const addresses = await Address.find({ user_id: req.params.userId });
        return res.json({
            success: true,
            data: addresses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy địa chỉ của user',
            error: error.message
        });
    }
});

// POST - Tạo địa chỉ mới
router.post('/', async (req, res, next) => {
    try {
        const {
            user_id,
            recipient_name,
            recipient_phone,
            street,
            ward,
            district,
            city,
            postal_code,
            is_default,
            address_type
        } = req.body;

        // Nếu địa chỉ này được đặt làm mặc định, bỏ mặc định của các địa chỉ khác
        if (is_default) {
            await Address.updateMany(
                { user_id: user_id },
                { is_default: false }
            );
        }

        const newAddress = new Address({
            user_id,
            recipient_name,
            recipient_phone,
            street,
            ward,
            district,
            city,
            postal_code,
            is_default,
            address_type
        });

        const savedAddress = await newAddress.save();

        return res.status(201).json({
            success: true,
            message: 'Tạo địa chỉ thành công',
            data: savedAddress
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Lỗi khi tạo địa chỉ',
            error: error.message
        });
    }
});

// PUT - Cập nhật địa chỉ
router.put('/:id', async (req, res, next) => {
    try {
        const { is_default, user_id } = req.body;

        // Nếu địa chỉ này được đặt làm mặc định, bỏ mặc định của các địa chỉ khác
        if (is_default && user_id) {
            await Address.updateMany(
                { user_id: user_id, _id: { $ne: req.params.id } },
                { is_default: false }
            );
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy địa chỉ'
            });
        }

        return res.json({
            success: true,
            message: 'Cập nhật địa chỉ thành công',
            data: updatedAddress
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Lỗi khi cập nhật địa chỉ',
            error: error.message
        });
    }
});

// DELETE - Xóa địa chỉ
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);

        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy địa chỉ'
            });
        }

        return res.json({
            success: true,
            message: 'Xóa địa chỉ thành công',
            data: deletedAddress
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa địa chỉ',
            error: error.message
        });
    }
});

export default router;
