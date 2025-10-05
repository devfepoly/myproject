const connection = require('../config/database');
const { getAllUsers, getAllUsersById, updateUserById, deleteUserById, createUserById } = require('../services/CRUDService');

const getHomePage = async (req, res) => {
    let results = await User.find({});
    return res.render('index.hbs', { listUsers: results });
}

const User = require('../models/user');

const getABC = (req, res) => {
    res.send('Check ABC')
}

const getHoiDanIT = (req, res) => {
    res.send('Check Hoi Dan IT')
}



const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    console.log(">>>> email: ", email, 'name: ', name, 'city: ', city);
    await User.create({
        name: name,
        email: email,
        city: city
    })
    res.send('Post create user successfully!');
};