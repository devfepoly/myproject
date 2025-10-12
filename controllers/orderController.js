import { getOrdersByFilter } from "../services/CRUDService/OrderService.js";
import Order from "../models/Order.js";

async function getOrder(req, res) {     
    if (!req.user) {
        return res.redirect('/auth/login');
    }
    const user = req.user;
    const { start_date, end_date, status } = req.query;

    try {
        const totalOrders = await getOrdersByFilter({ user_id: user._id }, { sortOrder: 'desc' });
        const grandTotalOrders = totalOrders.reduce((prev, curr) => prev + curr.grand_total, 0)

        const orders = await getOrdersByFilter({ user_id: user._id, startDate: start_date, endDate: end_date, status });
        const populatedOrders = await Order.find({
            _id: { $in: orders.map(o => o._id) }
        })
            .populate({ path: 'user_id', select: 'name email phone' })
            .populate({ path: 'address_id' })
            .populate({ path: 'voucher_id' })
            .populate({ path: 'payment_id' })
            .populate({
                path: 'order_details',
                populate: {
                    path: 'product_variant_id',
                    populate: [
                        { path: 'product_id', select: 'name price img_url' },
                        { path: 'color_id', select: 'name code' },
                        { path: 'size_id', select: 'name' },
                        { path: 'product_variant_images', select: 'img_url' }
                    ]
                }
            })
            .lean();

        // Render order page
        res.render('order', { totalOrders: totalOrders.length, grandTotalOrders, orders: populatedOrders })

    } catch (error) {
        console.error(error);
        res.status(500).redirect('/', {
            errors: ['An error occurred while updating the profile. Please try again later.'],
            user: req.user
        });
    }
}

export {
    getOrder,
}