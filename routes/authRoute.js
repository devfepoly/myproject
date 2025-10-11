import express from 'express';
import * as authController from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

/* GET login page */
router.get('/login', authMiddleware, (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('login');
});

/* GET register page */
router.get('/register', authMiddleware, (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('register');
});

/* POST register */
router.post('/register', authController.register)

/* POST login */
router.post('/login', authController.login)

/* POST logout */
router.post('/logout', authController.logout)

/* PATCH change password */
router.patch('/change-password', authMiddleware, authController.changePassword)

export default router;