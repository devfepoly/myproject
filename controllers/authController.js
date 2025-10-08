import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { gernerateToken } from '../services/JWTService.js';

async function register(req, res) {
    const { name, email, phone, password, confirm_password } = req.body;
    const errors = [];

    // Validate required fields
    if (!name || !email || !password || !confirm_password) {
        errors.push('Vui lòng nhập đầy đủ thông tin bắt buộc.');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push('Email không hợp lệ.');
    }

    // Validate password length
    if (password && password.length < 6) {
        errors.push('Mật khẩu phải có ít nhất 6 ký tự.');
    }

    // Validate password match
    if (password !== confirm_password) {
        errors.push('Mật khẩu nhập lại không khớp.');
    }

    // Check if email already exists
    if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            errors.push('Email đã được đăng ký.');
        }
    }

    if (errors.length > 0) {
        return res.status(400).render('register', {
            errors,
            old: { name, email, phone }
        });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
        name,
        email,
        phone,
        password_hash
    });

    await user.save();

    // Redirect to login page after successful registration
    res.redirect('login');
}

async function login(req, res) {
    const { email, password } = req.body;
    const errors = [];
    // Validate required fields
    if (!email || !password) {
        errors.push('Vui lòng nhập đầy đủ thông tin bắt buộc.');
        return res.status(400).render('login', { errors, old: { email } });
    }
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        errors.push('Email hoặc mật khẩu không đúng.');
        return res.status(400).render('login', { errors, old: { email } });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        errors.push('Email hoặc mật khẩu không đúng.');
        return res.status(400).render('login', { errors, old: { email } });
    }
    // Successful login
    const token = gernerateToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 day
    });
    res.redirect('/');
}

export {
    register,
    login,
}