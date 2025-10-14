async function getAdmin(req, res) {
    const user = req.user;    
    res.render('admin')
}

export {
    getAdmin
}