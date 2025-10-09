import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function gernerateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
}

async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            valid: true,
            expired: false,
            payload: decoded
        }
    } catch (err) {
        throw new Error('Invalid token');
        return {
            valid: false,
            message: 'Invalid token'
        }
    }   
}

export {
    gernerateToken,
    verifyToken
}