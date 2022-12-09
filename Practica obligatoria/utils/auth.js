function isAuthorized(req, res, next) {
    if(req.session && req.session.email) next();
    else res.redirect("/login");
}

function isNotAuthorized(req, res, next) {
    if(req.session && req.session.email) res.redirect("/");
    else next();
}

module.exports = {
    isAuthorized,
    isNotAuthorized
};