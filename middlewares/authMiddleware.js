import { getUserById } from "../services/CRUDService/UserService.js";
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
        
        let existingUser = await getUserById(user.id);        

        if (!existingUser) {
            res.locals.user = null;
            return next();
        }

        existingUser.password_hash = "";

        req.user = existingUser;

        res.locals.user = existingUser;

        next();
    } catch (err) {
        console.error('Token verify failed:', err);
        res.locals.user = null;
        next();
    }
}
