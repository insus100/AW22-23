"use strict";
const config = require("./config");
const { DAOAvisos } = require("./DAOAvisos");
const { DAOUsers } = require("./DAOUsers");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const { roles } = require('./utils/auth');
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
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
// Crear una instancia de DAO
const daoA = new DAOAvisos(pool);
const daoU = new DAOUsers(pool);

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
    /*res.locals.user = req.session.username;
    res.locals.role =  {
        name: roles[req.session.role],
        index: req.session.role
    }
    res.render(path.join(__dirname, `views/main`));*/
    /*daoT.getAllTasks(req.session.email , (err, tasks) => {
        if(err) console.log(err);
        else {
            console.log(tasks);
            if(!res.locals.user) res.locals.user = req.session.email;
            res.render(path.join(__dirname, 'views/usuario'), { tasksArray: tasks });
        }
    });*/
});

/*app.get('/finish/:id', isAuthorized, (req, res) => {
    const idTarea = parseInt(req.params.id);
    if(idTarea && !isNaN(idTarea)) {
        daoT.markTaskDone(idTarea, (err) => {
            if(err) console.log(err);
            else {
                res.redirect("/");
            }
        });
    }
});

app.get('/deleteCompleted', isAuthorized, (req, res) => {
    
    daoT.deleteCompleted(req.session.email, (err) => {
        if(err) console.log(err);
        else {
            res.redirect("/");
        }
    });
});

app.post('/addTask', isAuthorized, (req, res) => {
    if(req.body.tarea && req.body.tarea.length > 0) {
        const task = createTask(req.body.tarea);
        console.log("req.body", req.body, "\n", JSON.stringify(task));
        daoT.insertTask(req.session.email, task, (err) => {
            if(err) console.log(err);
            else {
                daoT.getAllTasks(req.session.email, (err, tasks) => {
                    if(err) console.log(err);
                    else {
                        //console.log("redirect to /");
                        res.redirect("/");
                        //res.render(path.join(__dirname, 'views/tasks'), { tasksArray: tasks });
                    }
                });
            }
        });
    } 
});*/

function setSessionDataAndRedirect(req, res, user) {
    req.session.userId = user.id;//database id (Auto increment)
    req.session.email = user.email;
    req.session.role = user.role;
    res.locals.role = {
        name: roles[user.role],//el nombre del rol (usuario, tecnico....)
        index: user.role//el numero del rol (el que se almacena en la base de datos, 0, 1 ....)
    };
    req.session.username = res.locals.user = user.username;
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

app.get("/logout", isAuthorized, function(req, res){
    req.session.destroy();
    res.redirect("/login");
});


app.get('/:page', isAuthorized, (req, res) => {//este manejador abajo del todo siempre, para que no haya conflictos con el resto
    const page = req.params.page;
    const role = req.session.role;
    if(config.pages[page]) {
        if(role < config.pages[page].minRole) {
            res.sendStatus(403);//forbidden
            return;
        }
        //mirar que en config, tengan las funciones del dao definidas en el objeto pages,
        //mejor no lo hacemos dinamico
        /*if(config.pages[page].daoFunc && config.pages[page].daoFunc[role]) {
            daoA[config.pages[page].daoFunc[role]](req, res, callbacks[page][config.pages[page].daoFunc[role]]);
        } else {
            console.error(`/:page ${page} error al ejecutar funcion del dao, la funcion no está definida en el objeto pages.${page}.daoFunc en config.js`);
        }*/
        if(page === 'avisos') {
            daoA.getMisAvisos(req.session.userId, req.session.role, (err, result) => {
                if(err) console.log("avisos " + err);
                else {
                    res.render(path.join(__dirname, `views/main`), { page: page, columns: config.pages[page].columns, dataArray: result });
                }
            });
        } else if(page === 'historico') {
            daoA.getMisAvisos(req.session.userId, req.session.role, (err, result) => {
                if(err) console.log("avisos " + err);
                else {
                    res.render(path.join(__dirname, `views/main`), { page: page, columns: config.pages[page].columns, dataArray: result });
                }
            });
        } else if(page === 'entrantes') {

        } else if(page === 'usuarios') {

        }
    } else {
        res.sendStatus(404);
    }
});