"use strict";
const config = require("./config");
const { DAOTasks } = require("./DAOTasks");
const { DAOUsers } = require("./DAOUsers");
const { createTask } = require("./utils/utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const { response } = require("express");
const MySQLStore = mysqlSession(session);
const { isAuthorized, isNotAuthorized } = require("./utils/auth");
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "aw_2022"
})
// Crear un servidor Express.js
const app = express();
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);
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
daoU.getUserImageName(req.session.currentUser, (err, img) => {
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

app.get('/', isAuthorized, function(req, res) {
    daoT.getAllTasks(req.session.currentUser , (err, tasks) => {
        if(err) console.log(err);
        else {
            console.log(tasks);
            if(!res.locals.user) res.locals.user = req.session.currentUser;
            res.render(path.join(__dirname, 'views/tasks'), { tasksArray: tasks });
        }
    });
});

app.get('/finish/:id', isAuthorized, (req, res) => {
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
    
    daoT.deleteCompleted(req.session.currentUser, (err) => {
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
        daoT.insertTask(req.session.currentUser, task, (err) => {
            if(err) console.log(err);
            else {
                daoT.getAllTasks(req.session.currentUser, (err, tasks) => {
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
});

app.get('/login', isNotAuthorized, (req, res) => {
    res.render(path.join(__dirname, 'views/login'), {mensaje : ""});
    /*if(req.session && req.session.currentUser){
        res.redirect("/");
    }
    else{
        res.render(path.join(__dirname, 'views/login'), {mensaje : ""});
    }*/
});

app.get('/register', isNotAuthorized, (req, res) => {
    res.render(path.join(__dirname, 'views/register'), {mensaje : ""});
    /*if(req.session && req.session.currentUser){
        res.redirect("/");
    }
    else{
        res.render(path.join(__dirname, 'views/login'), {mensaje : ""});
    }*/
});

app.post("/login", isNotAuthorized, function(req, res) {
    if(req.body.email && req.body.password){
        daoU.isUserCorrect(req.body.email,
            req.body.password, function (err, ok) {
                if(err){
                    console.log("/login", err)
                    res.status(500);
                    res.render(path.join(__dirname, 'views/login'), {mensaje : "Error interno de acceso a la base de datos"});
                }
                else if(ok){
                    req.session.currentUser = req.body.email;
                    res.locals.user = req.body.email;
                    res.redirect("/");
                }
                else{
                    res.status(200);
                    res.render(path.join(__dirname, 'views/login'), {mensaje : "Email y/o contraseña no válidos"});
                }
            })
    }
    else{
        res.render(path.join(__dirname, 'views/login'), {mensaje : "Introduzca todos los datos"});
    }
});

app.get("/logout", isAuthorized, function(req, res){
    req.session.destroy();
    res.redirect("/login");
});