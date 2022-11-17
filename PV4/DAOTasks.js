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
                            connection.query(`SELECT A.idUser, A.email, C.idTareas, C.texto, B.hecho, E.texto AS etiqueta FROM aw_tareas_usuarios A 
                            LEFT JOIN aw_tareas_user_tarea B ON A.idUser = B.idUser 
                            LEFT JOIN aw_tareas_tareas C ON B.idTarea = C.idTareas 
                            LEFT JOIN aw_tareas_tareas_etiquetas D ON D.idTarea = C.idTareas 
                            LEFT JOIN aw_tareas_etiquetas E ON E.idEtiqueta = D.idEtiqueta WHERE A.idUser = ${idUser}`,
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

    insertTask(email, task, callback){
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else{
                connection.query(`INSERT INTO aw_tareas_tareas (texto) VALUES ('${task.text}')`, 
                (err, result) => {
                    if(err) callback(new Error("insertTask: Error de acceso a la base de datos1 " + err));
                    else {
                        //console.log("insertTask " + JSON.stringify(task))
                        const taskId = result.insertId;
                        this.getUserIdFromEmail(email, (err, idUser) => {
                            if(err) console.log(err);
                            else {
                                connection.query(`INSERT INTO aw_tareas_user_tarea (idUser, idTarea) VALUES (${idUser}, ${taskId})`,
                                (err, result) => {
                                    connection.release();
                                    if(err) callback(new Error("Error de acceso a la base de datos3 " + err));
                                    else{
                                        let checkTagsExist = "SELECT * FROM aw_tareas_etiquetas WHERE ";
                                        let relationQuery = "INSERT INTO aw_tareas_tareas_etiquetas VALUES ";
                                        let tagQuery = "INSERT INTO aw_tareas_etiquetas (texto) VALUES ";
                                        if(task.tags && task.tags.length > 0){
                                            task.tags.forEach((t) =>  checkTagsExist += `texto = '${t}' OR `);
                                            checkTagsExist = checkTagsExist.slice(0, -4) + ';';
                                            //console.log("checkTagsExist", checkTagsExist);
                                            connection.query(checkTagsExist, (err, res) => {
                                                if(err) callback(new Error("insertTask: Error de acceso a la base de datos2 " + err));
                                                else {
                                                    //res contiene las tags a las que solo hay que meterlas en la relacion.
                                                    if(res.length > 0) {
                                                        res.forEach((t) => relationQuery += `(${taskId}, ${t.idEtiqueta}),`);
                                                        relationQuery = relationQuery.slice(0, -1) + ';';
                                                        task.tags = task.tags.filter((t) => { return !res.find(t2 => t2.texto.toLowerCase() === t.toLowerCase()); });//sacamos de task.tags las que ya estaban en la base de datos (las que estan en res)
                                                        //console.log("res", res, "\n", "task.tags", task.tags);
                                                        //console.log("relationQuery", relationQuery);
                                                        connection.query(relationQuery, (err, res) => { if(err) callback(new Error("insertTask: Error de acceso a la base de datos3 " + err));});
                                                    }
                                                    //en task.tags quedan ahora las tags a insertar y crear relacion
                                                    relationQuery = "INSERT INTO aw_tareas_tareas_etiquetas VALUES ";//reset for new tags.
                                                    task.tags.forEach((t) => tagQuery += `('${t}'),`);
                                                    tagQuery = tagQuery.slice(0, -1) + ';';
                                                    //console.log("tagQuery", tagQuery);
                                                    connection.query(tagQuery, (err, res) => {
                                                        if(err) callback(new Error("insertTask: Error de acceso a la base de datos3 " + err));
                                                        else {
                                                            let firstInsertId = res.insertId;
                                                            task.tags.forEach((t) => {
                                                                relationQuery += `(${taskId}, ${firstInsertId}),`;
                                                                firstInsertId++;
                                                            });
                                                            relationQuery = relationQuery.slice(0, -1) + ';';
                                                            connection.query(relationQuery, (err, res) => { if(err) callback(new Error("insertTask: Error de acceso a la base de datos3 " + err));});
                                                            callback(null);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else{
                                            callback(null);
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    markTaskDone(idTask, callback){
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("markTaskDone: Error de conexión a la base de datos"));
            else{
                connection.query(`UPDATE aw_tareas_user_tarea SET hecho=1 WHERE idTarea = ${idTask}`, 
                (err, result) => {
                    connection.release();
                    if(err) callback(new Error("markTaskDone: Error de acceso a la base de datos"));
                    else {
                        callback(null);
                    }
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
                            else {
                                callback(null);
                            }
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