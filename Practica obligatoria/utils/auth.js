const {daoU} = require("../DAO/DAO");
const roles = ["usuario", "tecnico"];//usar role como índice de este array (0 -> usuario, 1 -> técnico)
function isAuthorized(req, res, next) {
    if(req.session && req.session.userId) {
        daoU.getDatosUsuario(req.session.userId, (err, result) => {
            if(err) console.log("isAuthorized " + err);
            else {
                res.locals.user = result;
                res.locals.user.roleName = roles[result.role];
                next();
            }
        });
        /*res.locals.role =  {
            name: roles[req.session.role],
            index: req.session.role
        }
        res.locals.user = {
            username: req.session.username,
            id: req.session.userId
        }
        next();*/
    }
    else res.redirect("/login");
}

function isNotAuthorized(req, res, next) {
    if(req.session && req.session.userId) res.redirect("/");
    else next();
}

module.exports = {
    isAuthorized,
    isNotAuthorized,
    roles,
};