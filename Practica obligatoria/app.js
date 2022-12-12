"use strict";
const config = require("./config");
const {daoA, daoU} = require("./DAO/DAO");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const { isAuthorized, isNotAuthorized } = require("./utils/auth");
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: config.mysqlConfig.database
});
// Crear un servidor Express.js
const app = express();

let userPages = {};
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//ponemos el directorio public como estatico
app.use(express.static(path.join(__dirname, 'public')));

const middlewareSession = session({
    saveUninitialized: false,
    secret: "hytvr4vf",
    resave: false,
    store: sessionStore
});

app.use(middlewareSession);

// Arrancar el servidor
app.listen(config.port, function(err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

app.get("/imagenUsuario", function(req, res) {
daoU.getUserImageName(req.session.email, (err, img) => {
    if(err)console.log(err);
    else{
        if(img && img.length > 0){
            const imgpath = path.join(__dirname,  'profile_imgs/' + img);
            if(fs.existsSync(imgpath)) res.sendFile(imgpath);
            else{
                res.sendFile(path.join(__dirname, 'public/img/descarga.png'));
            }
        }
        else{
            res.sendFile(path.join(__dirname, 'public/img/descarga.png'));
        }
    }
});

});

app.get('/', isAuthorized, (req, res) => {
    res.redirect('/avisos');
});

function setSessionDataAndRedirect(req, res, user) {//se llama desde el login y el register
    req.session.userId = user.id;//database id (Auto increment)
    req.session.email = user.email;
    req.session.role = user.role;
    req.session.username = user.username;

    /*//al cambiar las locals aquí, acordarse de cambiarlas en utils/auth.js isAuthorized() también
    res.locals.role = {
        name: roles[user.role],//el nombre del rol (usuario, tecnico....)
        index: user.role//el numero del rol (el que se almacena en la base de datos, 0, 1 ....)
    };
    res.locals.user = {
        username: user.username,
        id: user.id
    }*/
    res.redirect("/");
}

app.get('/login', isNotAuthorized, (req, res) =>  res.render(path.join(__dirname, 'views/login'), {mensaje : ""}));//cuando se accede al enlace localhost:3000/login
app.get('/register', isNotAuthorized, (req, res) =>  res.render(path.join(__dirname, 'views/register'), {mensaje : ""}));//cuando se accede al enlace localhost:3000/register

app.post("/login", isNotAuthorized, function(req, res) {//cuando el usuario le da al boton de iniciar sesion en la view login, manda los datos aqui
    if(req.body.email && req.body.password){
        daoU.isUserCorrect(req.body.email, req.body.password,
            (err, user) => {
                if(err) {
                    console.log("/login", err)
                    res.status(500);
                    res.render(path.join(__dirname, 'views/login'), {mensaje : "Error interno de acceso a la base de datos"});
                }
                else if(user) {
                    setSessionDataAndRedirect(req, res, user);
                }
                else{
                    res.status(200);
                    res.render(path.join(__dirname, 'views/login'), {mensaje : "Email y/o contraseña no válidos"});
                }
            })
    }
    else {
        res.render(path.join(__dirname, 'views/login'), {mensaje : "Introduzca todos los datos"});
    }
});

app.post("/register", isNotAuthorized, (req, res) => {//cuando el usuario le da click a registrarse en la view register, manda los datos aquí
    console.log("/register " + JSON.stringify(req.body));
    if(req.body.email && req.body.password && req.body.email.length > 0 && req.body.password.length > 0 
        && req.body.nombreUsuario && req.body.nombreUsuario.length > 0) {
        if(req.body.password !== req.body.confirmPassword){
            res.render(path.join(__dirname, 'views/register'), {mensaje : "Las contraseñas no coinciden."});
        } else {
            daoU.getUserIdFromEmail(req.body.email, (err, userId) => {
                if(err && !userId) console.log(err);
                else if(err && userId === -1) {//usuario no registrado
                    const userData = {
                        email: req.body.email,
                        password: req.body.password,
                        username: req.body.nombreUsuario,
                        uniprofile: req.body.perfil,
                        img: req.body.img,
                        role: req.body.role ? 1 : 0,
                        employeenumber: req.body.employeenumber.length > 0 ? req.body.employeenumber : -1
                    }
                    if(userData.role === 1) {
                        const regex = /^([0-9]{4})-([a-z]{3})$/;
                        const result = regex.test(userData.employeenumber);
                        if(!result) {
                            res.render(path.join(__dirname, 'views/register'), {mensaje : "El Nº de empleado tiene un formato incorrecto, ejemplo: 1234-abc"});
                            return;//parar ejecución aquí
                        }
                    }
                    daoU.registerUser(userData, (err, response) => {
                        if(err) console.log(err);
                        else {
                            userData.id = response.insertId;
                            setSessionDataAndRedirect(req, res, userData);
                        }
                    });
                } else {//hay un usuario registrado con ese mail
                    res.render(path.join(__dirname, 'views/register'), {mensaje : "El usuario ya existe."});
                }
            });
        }
    } else {
        res.render(path.join(__dirname, 'views/register'), {mensaje : "Introduzca todos los datos"});
    }
    
});

app.post("/asignarTecnico", isAuthorized, (req, res) => {
    if(req.body.tecnico && req.body.idAviso && req.session.role > 0) {
        daoA.asignarTecnico(req.body.idAviso, req.body.tecnico, (err, result) => {
            res.redirect("/entrantes");
        });
    } else {
        res.redirect("/entrantes")
    }
});

app.post("/nuevoAviso", isAuthorized, (req, res) => {
    //console.log("/nuevoAviso", req.body);
    if(req.body.tipoAviso) {
        const tipoAviso = parseInt(req.body.tipoAviso);
        if(!isNaN(tipoAviso)) {
            if(tipoAviso === 0 || tipoAviso === 1) {//sugerencia o incidencia
                if(req.body.categoria && req.body.funcion && req.body.observaciones) {
                    const aviso = {//las keys en este objeto tienen que tener el mismo nombre que las columnas en la tabla de la base de datos
                        creador: req.session.userId,
                        tipo: tipoAviso,
                        texto: req.body.observaciones,
                        categoria: req.body.categoria,
                        funcion: req.body.funcion,
                    };
                    daoA.insertAviso(aviso, (err, result) => {
                        if(err) console.log(err)
                        res.redirect("/avisos");
                    });
                }
            } else {
                if(req.body.tipoAvisoFelicitacion && req.body.observaciones) {
                    const aviso = {//las keys en este objeto tienen que tener el mismo nombre que las columnas en la tabla de la base de datos
                        creador: req.session.userId,
                        tipo: tipoAviso,
                        texto: req.body.observaciones,
                        categoria: req.body.tipoAvisoFelicitacion,
                        funcion: "",
                    };
                    daoA.insertAviso(aviso, (err, result) => {
                        if(err) console.log(err)
                        res.redirect("/avisos");
                    });
                }
            }
        }
    } else {
        res.redirect("/avisos");
    }
});

app.get("/logout", isAuthorized, function(req, res){
    req.session.destroy();
    res.redirect("/login");
});

app.get('/deleteAviso/:id', isAuthorized, (req, res) => {
    if(req.session.role < 1) {
        res.redirect("/avisos");
        return;
    }
    const idAviso = parseInt(req.params.id);
    //console.log("/deleteAviso", idAviso);
    if(idAviso && !isNaN(idAviso)) {
        daoA.deleteAviso(idAviso, (err, result) => {
            if(err) console.log(err);
            if(userPages[req.session.userId]) res.redirect(`/${userPages[req.session.userId]}`);
            else res.redirect("/avisos");
        });
    }
});

app.get("/disableUser/:id", isAuthorized, (req, res) => {
    if(req.session.role < 1) {
        res.redirect("/avisos");
        return;
    }
    const userId = parseInt(req.params.id);
    if(userId && !isNaN(userId)) {
        daoU.disableUser(userId, (err) => {
            if(err) console.log(err);
            if(userPages[req.session.userId]) res.redirect(`/${userPages[req.session.userId]}`);
            else res.redirect("/avisos");
        });
    }
});

app.get("/resolverAviso/:id", isAuthorized, (req, res) => {
    if(req.session.role < 1) {
        res.redirect("/avisos");
        return;
    }
    const idAviso = parseInt(req.params.id);
    if(!isNaN(idAviso) && req.query.comment) {
        const comentario = req.query.eliminado === 'true' ? `Este aviso ha sido eliminado por el técnico ${req.session.username} debido a: ${req.query.comment}` : req.query.comment;
        daoA.resolverAviso(idAviso, comentario, (err, result) => {
            if(err) console.log(err);
            res.redirect("/avisos");
        });
    } else {
        res.redirect("/avisos");
    }
});

app.get('/:page', isAuthorized, (req, res) => {//este manejador abajo del todo siempre, para que no haya conflictos con el resto
    const page = req.params.page;
    const role = req.session.role;
    if(config.pages[page]) {
        if(role < config.pages[page].minRole) {
            //res.sendStatus(403);//forbidden
            res.redirect("/avisos");
            return;
        }
        userPages[req.session.userId] = page;
        //mirar que en config, tengan las funciones del dao definidas en el objeto pages,
        //mejor no lo hacemos dinamico
        /*if(config.pages[page].daoFunc && config.pages[page].daoFunc[role]) {
            daoA[config.pages[page].daoFunc[role]](req, res, callbacks[page][config.pages[page].daoFunc[role]]);
        } else {
            console.error(`/:page ${page} error al ejecutar funcion del dao, la funcion no está definida en el objeto pages.${page}.daoFunc en config.js`);
        }*/
        if(page === 'avisos') {//cada vez que se añada una página nueva, añadirla en el config.js tb con sus columnas a mostrar
            daoA.getMisAvisos(req.session.userId, role, (err, result) => {
                if(err) console.log("avisos " + err);
                else {
                    res.render(path.join(__dirname, `views/main`), { page: page, columns: config.pages[page].columns, dataArray: result, tecnicos: null, nuevoAvisoData: page === 'avisos' && role === 0 ? config.nuevoAvisoData : null });
                }
            });
        } else if(page === 'historico') {
            daoA.getHistorico(req.session.userId, role, (err, result) => {
                if(err) console.log("historico " + err);
                else {
                    res.render(path.join(__dirname, `views/main`), { page: page, columns: config.pages[page].columns, dataArray: result, tecnicos: null });
                }
            });
        } else if(page === 'entrantes') {
            daoA.getEntrantes(req.session.userId, (err, result) => {
                if(err) console.log("entrantes " + err);
                else {
                    daoU.getTecnicos((err, tecnicos) => {
                        if(err) console.log("entrantes2 " + err);
                        else res.render(path.join(__dirname, `views/main`), { page: page, columns: config.pages[page].columns, dataArray: result, tecnicos: tecnicos });
                        //el objeto técnicos que se pasa aquí es para el dropdown del botón de asignar técnico
                    });
                }
            });
        } else if(page === 'usuarios') {
            daoU.getAllUsuarios((err, result) => {
                if(err) console.log(err);
                else res.render(path.join(__dirname, `views/main`), { page: page, columns: config.pages[page].columns, dataArray: result, tecnicos: null });
            });
        }
    } else {
        //res.sendStatus(404);
        res.redirect("/avisos");
    }
});