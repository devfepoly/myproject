export default async function adminMiddleware(req, res, next) {
    const user = req.user;
    const redirectUrl = req.headers.referer || '/';
    
    if (user && user.role === 'admin') return next();
    return res.redirect(redirectUrl);
}
