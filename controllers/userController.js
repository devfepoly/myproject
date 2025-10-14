import { updateUserById } from '../services/CRUDService/UserService.js'
import { getOrdersByFilter } from '../services/CRUDService/OrderService.js';
import * as addressService from "../services/CRUDService/AddressService.js"

async function getUserOverall(req, res) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    const user = req.user;

    try {
        const orders = await getOrdersByFilter({ user_id: user._id }, { sortOrder: 'desc' });
        const grandTotalOrders = orders.reduce((prev, curr) => prev + curr.grand_total, 0)
        const recentOrders = orders.slice(0, 5);        

        res.render('user-overall', { totalOrders: orders.length, grandTotalOrders, recentOrders, vouchers: [], favouriteProducts: [] });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).render('/', {
            errors: ['An error occurred while updating the profile. Please try again later.'],
            user: req.user
        });
    }
}

async function getUserInfo(req, res) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    const user = req.user;

    try {
        const orders = await getOrdersByFilter({ user_id: user._id }, { sortOrder: 'desc' });
        let addresses = await addressService.getByUserId(user._id);
        addresses = addresses.sort((a, b) => (b.is_default === true) - (a.is_default === true));
        const grandTotalOrders = orders.reduce((prev, curr) => prev + curr.grand_total, 0);

        res.render('user-info', { totalOrders: orders.length, grandTotalOrders, user, addresses });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).render('/', {
            errors: ['An error occurred while updating the profile. Please try again later.'],
            user: req.user
        });
    }
}

async function updateUserProfile(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, phone, gender } = req.body;
    const errors = [];
    if (!name) {
        errors.push('Yêu cầu nhập tên.');
    }
    if (errors.length > 0) {
        return res.status(400).render('profile', {
            errors,
            user: req.user
        });
    }
    try {
        const user = req.user;
        const dataUpdate = {
            name,
            phone,
            gender
        }

        await updateUserById(user._id, dataUpdate);
        res.redirect('/user/user-info');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).render('userOverall', {
            errors: ['An error occurred while updating the profile. Please try again later.'],
            user: req.user
        });
    }
}

export {
    getUserOverall,
    getUserInfo,
    updateUserProfile
}