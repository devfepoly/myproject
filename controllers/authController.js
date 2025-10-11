import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { gernerateToken } from '../services/JWTService.js';
import { createUser } from '../services/CRUDService/UserService.js'

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
    await createUser({ name, email, phone, password_hash })

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

async function logout(req, res) {
    res.clearCookie('token');
    res.redirect('/');
}

async function changePassword(req, res) {
    if (!req.user) {
        return res.render('auth/login', {
            errors: { changePassword: ['Vui lòng đăng nhập để thực hiện chức năng này.'] }
        });
    }

    const { old_password, new_password, confirm_new_password } = req.body;
    const errors = {};
    const successes = {};

    // Validate các trường
    if (!old_password || !new_password || !confirm_new_password) {
        errors.changePassword = ['Vui lòng điền đầy đủ các trường.'];
    } else {
        if (new_password !== confirm_new_password) {
            errors.changePassword = ['Mật khẩu mới không khớp.'];
        } else if (new_password.length < 6) {
            errors.changePassword = ['Mật khẩu mới phải có ít nhất 6 ký tự.'];
        }
    }

    if (Object.keys(errors).length > 0) {
        req.session.errors = errors;
        const redirectUrl = req.headers.referer || '/user/profile';
        return res.redirect(redirectUrl);
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            req.session.errors = { changePassword: ['Người dùng không tồn tại.'] };
            const redirectUrl = req.headers.referer || '/user/profile';
            return res.redirect(redirectUrl);
        }

        const isMatch = await bcrypt.compare(old_password, user.password_hash);
        if (!isMatch) {
            req.session.errors = { changePassword: ['Mật khẩu cũ không đúng.'] };
            const redirectUrl = req.headers.referer || '/user/profile';
            return res.redirect(redirectUrl);
        }

        const new_password_hash = await bcrypt.hash(new_password, 10);
        await User.findByIdAndUpdate(user._id, { password_hash: new_password_hash });

        successes.changePassword = true;
        req.session.successes = successes;

        const redirectUrl = req.headers.referer || '/user/profile';
        return res.redirect(redirectUrl);

    } catch (error) {
        console.error('Error changing password:', error);
        req.session.errors = { changePassword: ['Đã xảy ra lỗi server. Vui lòng thử lại sau.'] };
        const redirectUrl = req.headers.referer || '/user/profile';
        return res.redirect(redirectUrl);
    }
}

export {
    register,
    login,
    logout,
    changePassword
}