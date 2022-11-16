"use strict";

class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }

    getUserIdFromEmail(email, callback){
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query(`SELECT idUser FROM aw_tareas_usuarios WHERE email='${email}'`,
                (err, rows) => {
                    if(err) callback(new Error("Error de acceso a la base de datos " + err));
                    else {
                        if (rows.length === 0) callback(new Error("No existe el usuario"));
                        else {
                            callback(null, rows[0].idUser);
                        }
                    }
                });
            }
        });
    }

    getAllTasks(email, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else {
                this.getUserIdFromEmail(email, (err, idUser) => {
                    if(err) console.log(err);
                    else {
                        if(idUser !== undefined){
                            /*SELECT idUser, aw_tareas_tareas.idTareas, hecho, aw_tareas_tareas.texto, aw_tareas_etiquetas.texto as etiqueta FROM aw_tareas_user_tarea JOIN aw_tareas_tareas ON aw_tareas_user_tarea.idTarea = aw_tareas_tareas.idTareas JOIN aw_tareas_tareas_etiquetas ON aw_tareas_tareas.idTareas = aw_tareas_tareas_etiquetas.idTarea JOIN aw_tareas_etiquetas ON aw_tareas_etiquetas.idEtiqueta = aw_tareas_tareas_etiquetas.idEtiqueta WHERE aw_tareas_user_tarea.idUser = 1;*/
                            //connection.query(`SELECT * FROM aw_tareas_user_tarea JOIN aw_tareas_tareas ON aw_tareas_user_tarea.idTarea = aw_tareas_tareas.idTareas WHERE aw_tareas_user_tarea.idUser = ${idUser}`,
                            connection.query(`SELECT idUser, aw_tareas_tareas.idTareas, hecho, aw_tareas_tareas.texto, aw_tareas_etiquetas.texto as etiqueta FROM aw_tareas_user_tarea JOIN aw_tareas_tareas ON aw_tareas_user_tarea.idTarea = aw_tareas_tareas.idTareas JOIN aw_tareas_tareas_etiquetas ON aw_tareas_tareas.idTareas = aw_tareas_tareas_etiquetas.idTarea JOIN aw_tareas_etiquetas ON aw_tareas_etiquetas.idEtiqueta = aw_tareas_tareas_etiquetas.idEtiqueta WHERE aw_tareas_user_tarea.idUser = ${idUser}`,
                            (err, rows) => {
                                connection.release();
                                if(err) callback(new Error("Error de acceso a la base de datos11 " + err));
                                else {
                                    let tasks = [];
                                    rows.forEach((tarea) => {
                                        if(tasks[tarea.idTareas] === undefined){
                                            tasks[tarea.idTareas] = {
                                                idTareas: tarea.idTareas,
                                                hecho: tarea.hecho,
                                                texto: tarea.texto,
                                                tags: [tarea.etiqueta]
                                            };
                                        }
                                        else tasks[tarea.idTareas].tags.push(tarea.etiqueta); 
                                    });
                                    tasks = tasks.filter(t => t !== undefined);//quitar objetos vacios del array;
                                    callback(null, tasks);
                                }
                            })
                        }
                    }
                });
            }
        });
    }
    doesTagExist(tag, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("doesTagExist: Error de conexión a la base de datos " + err));
            else {
                connection.query(`SELECT * FROM aw_tareas_etiquetas WHERE texto='${tag}'`, (err, res) => {
                    if(err) callback(new Error("doesTagExist: Error de acceso a la base de datos " + err));
                    else {
                        callback(null, res.length > 1, res.length > 1 ? res[0].idEtiqueta : null);
                    }
                });
            }
        });
    }
    insertTask(email, task, callback){
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else{
                connection.query(`INSERT INTO aw_tareas_tareas (texto) VALUES ('${task.text}')`, 
                (err, result) => {
                    connection.release(); //TODO REVISAR
                    if(err) callback(new Error("Error de acceso a la base de datos1 " + err));
                    else {
                        console.log("insertTask " + JSON.stringify(task))
                        const taskId = result.insertId;
                        let tagQuery = "INSERT INTO aw_tareas_etiquetas (texto) VALUES ";
                        let relationQuery = "INSERT INTO aw_tareas_tareas_etiquetas VALUES ";
                        task.tags.forEach(t => {
                            this.doesTagExist(t, (err, existe, tagId) => {
                                if(err) console.log(err);
                                else {
                                    if(existe) {//si existe solo añadimos la relacion
                                        relationQuery += `(${taskId}, ${tagId}),`;
                                    } else {//si no, tenemos que crear las tags y luego relacionarlas
                                        tagQuery += `(${t}),`;
                                        //relationQuery += `(${taskId}, ${tagId}),`;
                                    }
                                }
                            }); 
                        });
                        tagQuery = tagQuery.slice(0, -1) + ';';
                        relationQuery = relationQuery.slice(0, -1) + ';';
                        console.log(tagQuery + "\n" + relationQuery);
                        /*connection.query(tagQuery, (err, res) => {
                            if(err) callback(new Error("Error de acceso a la base de datos2 " + err));
                            else {
                                if(taskId) {
                                    console.log(JSON.stringify(res));
                                }
                            }
                        });*/
                        //let tagQuery = "INSERT INTO aw_tareas_tareas_etiquetas VALUES ";
                        /*task.tags.forEach((t) => {
                            tagQuery += `(${taskId}, ${t}),`;
                            //connection.query(`INSERT INTO aw_tareas_tareas_etiquetas VALUES (${taskId}, ${t})`, 
                            //(err, result) => {
                            //    if(err) callback(new Error("Error de acceso a la base de datos2 " + err));
                            //});
                        });*/
                        /*connection.query(tagQuery, 
                        (err, result) => {
                            if(err) callback(new Error("Error de acceso a la base de datos2 " + err));
                            else {
                                if(taskId != undefined){
                                    this.getUserIdFromEmail(email, (err, idUser) => {
                                        if(err) console.log(err);
                                        else {
                                            connection.query(`INSERT INTO aw_tareas_user_tarea (idUser, idTarea) VALUES (${idUser}, ${taskId})`,
                                            (err, result) => {
                                                connection.release();
                                                if(err) callback(new Error("Error de acceso a la base de datos3 " + err));
                                            });
                                        }
                                    });
                                }
                            }
                        });*/
                    }
                });
            }
        });
    }

    markTaskDone(idTask, callback){
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else{
                connection.query(`UPDATE aw_tareas_user_tarea SET hecho=1 WHERE idTarea = ${idTask}`, 
                (err, result) => {
                    connection.release();
                    if(err) callback(new Error("Error de acceso a la base de datos"));
                });
            }
        });
    }

    deleteCompleted(email, callback){
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else{
                this.getUserIdFromEmail(email, (err, idUser) => {
                    if(err) console.log(err);
                    else {
                        connection.query(`DELETE FROM aw_tareas_user_tarea WHERE hecho=1 AND idUser=${idUser}`,
                        (err, result) => {
                            connection.release();
                            if(err) callback(new Error("Error de acceso a la base de datos"));
                        });
                    }
                });
            }
        });
    }


}

module.exports = {
    DAOTasks
}