"use strict";

const mysql = require("mysql");
const config = require("./config");
const { DAOUsers } = require("./Classes/DAOUsers");
const { DAOTasks } = require("./Classes/DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
console.log(`MySQL server connected: host:${config.host}`);

const daoUser = new DAOUsers(pool);
const daoTask = new DAOTasks(pool);

// Definición de las funciones callback

daoTask.getAllTasks('aitor.tilla@ucm.es', (err, tasks) => {
    if(err) console.log(err);
    else {
        console.log(JSON.stringify(tasks));
    }
})
// Uso de los métodos de las clases DAOUsers y DAOTasks