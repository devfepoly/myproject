import { getOrdersByFilter } from "../services/CRUDService/OrderService.js";

async function getSupport(req, res) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    const user = req.user;

    try {
        const orders = await getOrdersByFilter({ user_id: user._id }, { sortOrder: 'desc' });
        const grandTotalOrders = orders.reduce((prev, curr) => prev + curr.grand_total, 0)

        res.render('support', { totalOrders: orders.length, grandTotalOrders });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).render('/', {
            errors: ['An error occurred while updating the profile. Please try again later.'],
            user: req.user
        });
    }
}

export {
    getSupport
}
