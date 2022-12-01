function isAuthorized(req, res, next) {
    if(req.session && req.session.currentUser) next();
    else res.redirect("/login");
}

function isNotAuthorized(req, res, next) {
    if(req.session && req.session.currentUser) res.redirect("/");
    else next();
}

module.exports = {
    isAuthorized,
    isNotAuthorized
};