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
console.log(`MySQL server connected: host: ${config.host}`);

const daoUser = new DAOUsers(pool);
const daoTask = new DAOTasks(pool);

// Definición de las funciones callback
function onGetAllTasks(err, tasks) {
    if(err) console.log(err);
    else {
        console.log(tasks);
    }
}
function onInsertTask(err) {
    if(err) console.log(err);
}
function onMarkTaskDone(err) {
    if(err) console.log(err);
}
function onDeleteCompleted(err) {
    if(err) console.log(err);
}

function onIsUserCorrect(err, isCorrect) {
    if(err) console.log(err);
    else {
        isCorrect ? console.log('Usuario correcto') : console.log('Usuario incorrecto');
    }
}

function onGetUserImageName(err, img) {
    if(err) console.log(err);
    else {
        console.log(`onGetUserImageName: ${img}`);
    }
}

// Uso de los métodos de las clases DAOUsers y DAOTasks
daoTask.getAllTasks('aitor.tilla@ucm.es', onGetAllTasks);
daoTask.insertTask('aitor.tilla@ucm.es', { text: `test${Date.now()}`, tags: [1, 2] }, onInsertTask);
daoTask.markTaskDone(3, onMarkTaskDone);
daoTask.deleteCompleted('aitor.tilla@ucm.es', onDeleteCompleted);

daoUser.isUserCorrect('aitor.tilla@ucm.es', 'aitor', onIsUserCorrect);
daoUser.getUserImageName('bill.puertas@ucm.es', onGetUserImageName);