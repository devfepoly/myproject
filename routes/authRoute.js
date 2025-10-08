import express from 'express';
import * as authController from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

// GET Method
router.get('/login', authMiddleware,(req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('login');
});

router.get('/register', authMiddleware,(req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('register');
});

// POST Method
router.post('/register', authController.register)

router.post('/login', authController.login)

export default router;