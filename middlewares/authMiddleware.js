import User from "../models/User.js";
import { verifyToken } from "../services/JWTService.js";

export default async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.locals.user = null;
        return next();
    }

    try {
        const decoded = await verifyToken(token);
        const user = decoded.payload;
        
        const existingUser = await User.findById(user.id, '-password_hash -__v');        

        if (!existingUser) {
            res.locals.user = null;
            return next();
        }

        req.user = existingUser;

        res.locals.user = existingUser;

        next();
    } catch (err) {
        console.error('Token verify failed:', err);
        res.locals.user = null;
        next();
    }
}
