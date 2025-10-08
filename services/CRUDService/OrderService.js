import Order from '../../models/Order.js';

export async function createOrder(orderData) {
    const order = new Order(orderData);
    return await order.save();
}

export async function getAllOrders() {
    return await Order.find();
}

export async function getOrderById(id) {
    return await Order.findById(id);
}

export async function getOrdersByFilter(filter = {}, options = {}) {
    const allowedFields = [
        'user_id',
        'address_id',
        'voucher_id',
        'payment_id',
        'status',
        'subtotal',
        'discount_total',
        'grand_total'
    ];

    const query = {};
    for (const key of allowedFields) {
        if (filter[key] !== undefined) {
            query[key] = filter[key];
        }
    }

    let sort = {};
    if (options.sortBy === 'createdAt' || options.sortBy === 'updatedAt') {
        const sortOrder =
            options.sortOrder === 'desc' || options.sortOrder === -1 ? -1 : 1;
        sort[options.sortBy] = sortOrder;
    } else {
        sort = { createdAt: -1 };
    }

    const limit =
        typeof options.top === 'number' && options.top > 0 ? options.top : 0;

    return await Order.find(query).sort(sort).limit(limit).lean();
}

export async function updateOrderById(id, updateData) {
    return await Order.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteOrderById(id) {
    return await Order.findByIdAndDelete(id);
}