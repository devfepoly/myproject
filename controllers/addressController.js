import Address from "../models/Address.js";
import * as addressService from "../services/CRUDService/AddressService.js";
import fetch from "node-fetch";

// API get Provinces
function getProvinces(req, res) {
    fetch("https://provinces.open-api.vn/api/p/")
        .then(response => response.json())
        .then(provinces => res.json(provinces));
}

// API get Districts follow Province code
function getDistricts(req, res) {
    const { provinceCode } = req.params;
    fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then(response => response.json())
        .then(data => res.json(data.districts));
}

// API get Wards follow District code
function getWards(req, res) {
    const { districtCode } = req.params;
    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then(response => response.json())
        .then(data => res.json(data.wards));
}

// Save into DB
async function createAddress(req, res) {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    const user = req.user;
    const addressData = req.body;
    addressData.user_id = user._id;
    const isDefault = addressData.is_default;
    addressData.is_default = false;

    try {
        const newAddress = await addressService.createAddress(addressData);
        if (isDefault) {
            await addressService.setDefaultAddress(user._id, newAddress._id);
        }

        if (req.headers.referer) {
            res.redirect(req.headers.referer);
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.status(500).redirect('/', {
            errors: ['An error occurred while updating the profile. Please try again later.'],
            user: req.user
        });
    }
}

async function deleteAddress(req, res) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    const { id } = req.params;

    try {
        await Address.findOneAndDelete({ 
            _id: id, 
            user_id: req.user._id 
        });

        if (req.headers.referer) {
            res.redirect(req.headers.referer);
        } else {
            res.redirect("/");
        }

    } catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).redirect('/user/profile');
    }
}

async function updateAddress(req, res) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    const { id: addressId } = req.params; 
    const { recipient_name, recipient_phone, city, district, ward, street, is_default } = req.body; 

    try {
        const updateData = {
            recipient_name,
            recipient_phone,
            city,
            district,
            ward,
            street,
            is_default: is_default === 'on'
        };

        const updatedAddress = await Address.findOneAndUpdate(
            { _id: addressId, user_id: req.user._id },
            updateData,
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found or unauthorized' });
        }

        if (is_default === 'on') {
            await Address.updateMany(
                { user_id: req.user._id, _id: { $ne: addressId } },
                { is_default: false }
            );
        }

        if (req.headers.referer) {
            res.redirect(req.headers.referer);
        } else {
            res.redirect("/user/profile"); 
        }

    } catch (error) {
        console.error(error);
        res.status(500).redirect('/user/profile');
    }
}

export {
    getProvinces,
    getWards,
    getDistricts,
    createAddress,
    deleteAddress,
    updateAddress
}