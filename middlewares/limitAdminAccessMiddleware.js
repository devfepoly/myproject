export default function limitAdminAccessMiddleware(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        if (!req.path.startsWith('/admin')) {
            return res.redirect('/admin');
        }
    }
    next();
}