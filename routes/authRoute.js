import express from 'express';
import * as authController from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import passport from '../config/passport.js';
import { gernerateToken } from '../services/JWTService.js';
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

/* GET login with google */
router.get('/login/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function (req, res) {
        const user = req.user;
        const token = gernerateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 day
        });
        res.redirect('/');
    });

/* POST logout */
router.post('/logout', authController.logout);

/* GET forgot password */ 
router.get('/forgot-password', authController.getForgotPassword);

/* POST forgot password */
router.post('/forgot-password', authController.forgotPassword);

/* GET reset password */
router.get('/reset-password/:token', authController.getResetPassword);

/* POST reset password */
router.post('/reset-password/:token', authController.resetPassword);

/* PATCH change password */
router.patch('/change-password', authMiddleware, authController.changePassword);

export default router;