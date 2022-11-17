"use strict";
const config = require("./config");
const { DAOTasks } = require("./DAOTasks");
const { createTask } = require("./utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
// Crear un servidor Express.js
const app = express();
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//ponemos el directorio public como estatico
app.use(express.static(path.join(__dirname, 'public')));

// Arrancar el servidor
app.listen(config.port, function(err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

app.get('/', function(req, res) {
    daoT.getAllTasks('aitor.tilla@ucm.es', (err, tasks) => {
        if(err) console.log(err);
        else {
            console.log(tasks);
            res.render(path.join(__dirname, 'views/tasks'), { tasksArray: tasks });
        }
    });
});

app.get('/finish/:id', (req, res) => {
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

app.get('/deleteCompleted', (req, res) => {
    daoT.deleteCompleted('aitor.tilla@ucm.es', (err) => {
        if(err) console.log(err);
        else {
            res.redirect("/");
        }
    });
    
});

app.post('/addTask', (req, res) => {
    if(req.body.tarea && req.body.tarea.length > 0) {
        const task = createTask(req.body.tarea);
        console.log("req.body", req.body, "\n", JSON.stringify(task));
        daoT.insertTask('aitor.tilla@ucm.es', task, (err) => {
            if(err) console.log(err);
            else {
                daoT.getAllTasks('aitor.tilla@ucm.es', (err, tasks) => {
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