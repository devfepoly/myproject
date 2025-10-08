import { updateUserById } from '../services/CRUDService/UserService.js'
import { getAllOrders, getOrdersByFilter } from '../services/CRUDService/OrderService.js';

async function getUserOverall(req, res) {
    if (!req.user) {
        res.redirect('/auth/login');
    }

    const user = req.user;

    try {
        const orders = await getOrdersByFilter({ user_id: user._id }, { sortOrder: 'desc' });
        const grandTotalOrders = orders.reduce((prev, curr) => prev + curr.grand_total, 0)
        const recentOrders = orders.slice(0, 5);        

        res.render('userOverall', { user: req.user, totalOrders: orders.length, recentOrders, grandTotalOrders, vouchers: [], favouriteProducts: [] });
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

    const { name, phone } = req.body;
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
        user.name = name;
        user.phone = phone;

        await updateUserById(user._id, user);
        res.redirect('/user');
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
    updateUserProfile
}