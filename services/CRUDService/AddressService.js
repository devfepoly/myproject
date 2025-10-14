import Address from "../../models/Address.js";

export async function getByUserId(userId) {
    return await Address.find({ user_id: userId });
}

export async function getById(addressId) {
    return await Address.findById(addressId);
}

export async function createAddress(data) {
    const address = new Address(data);
    return await address.save();
}

export async function updateAddress(addressId, data) {
    return await Address.findByIdAndUpdate(addressId, data, { new: true });
}

export async function deleteAddress(addressId) {
    return await Address.findByIdAndDelete(addressId);
}

export async function setDefaultAddress(userId, addressId) {
    await Address.updateMany({ user_id: userId }, { is_default: false });

    return await Address.findByIdAndUpdate(
        addressId,
        { is_default: true },
        { new: true }
    );
}

export async function getDefaultAddress(userId) {
    return await Address.findOne({ user_id: userId, is_default: true });
}
