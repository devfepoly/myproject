import User from '../../models/User.js';

export async function createUser(userData) {
    const user = new User(userData);
    return await user.save();
}

export async function getAllUsers() {
    return await User.find();
}

export async function getUserById(id) {
    return await User.findById(id);
}

export async function getUserByEmail(email) {
    return await User.findOne({ email });
}

export async function updateUserById(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteUserById(id) {
    return await User.findByIdAndDelete(id);
}