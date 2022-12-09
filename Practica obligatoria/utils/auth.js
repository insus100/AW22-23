const roles = ["usuario", "tecnico"];//usar role como índice de este array (0 -> usuario, 1 -> técnico)
function isAuthorized(req, res, next) {
    if(req.session && req.session.email) {
        res.locals.user = req.session.username;
        res.locals.role =  {
            name: roles[req.session.role],
            index: req.session.role
        }
        next();
    }
    else res.redirect("/login");
}

function isNotAuthorized(req, res, next) {
    if(req.session && req.session.email) res.redirect("/");
    else next();
}

module.exports = {
    isAuthorized,
    isNotAuthorized,
    roles
};